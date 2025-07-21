import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
}

const MAX_WIDTH = 550;
const MAX_HEIGHT = 550;

const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCropComplete }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);
  const [imgDims, setImgDims] = useState<{width: number, height: number}>({width: MAX_WIDTH, height: MAX_HEIGHT});

  useEffect(() => {
    // Get natural image size to adjust container
    const img = new window.Image();
    img.onload = () => {
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      // Scale down if too big
      const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height, 1);
      setImgDims({
        width: Math.round(width * scale),
        height: Math.round(height * scale)
      });
    };
    img.src = image;
  }, [image]);

  useEffect(() => {
    if (imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        viewMode: 1,
        background: false,
        autoCropArea: 1,
        zoomable: true,
        responsive: true,
        checkOrientation: false,
        dragMode: 'move',
        cropBoxMovable: true,
        cropBoxResizable: true,
        scalable: true,
        aspectRatio: NaN,
        restore: true,
        guides: true,
        highlight: true,
        toggleDragModeOnDblclick: true,
        minContainerWidth: 100,
        minContainerHeight: 100,
      });
    }
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
    };
  }, [image, imgDims]);

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL('image/jpeg');
      onCropComplete(croppedImage);
    }
  };

  const handleReset = () => {
    if (cropperRef.current) {
      cropperRef.current.reset();
      cropperRef.current.zoomTo(0);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div
        className="overflow-hidden rounded shadow border bg-gray-100 flex items-center justify-center mx-auto"
        style={{
          maxWidth: MAX_WIDTH,
          maxHeight: MAX_HEIGHT,
          width: imgDims.width,
          height: imgDims.height,
          display: 'inline-block',
        }}
      >
        <img
          ref={imageRef}
          src={image}
          alt="Original"
          className="max-w-full max-h-full object-contain"
          style={{ width: imgDims.width, height: imgDims.height }}
        />
      </div>
      <div className="flex gap-4 mt-2 justify-center">
        <button
          onClick={handleCrop}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-medium"
        >
          Crop Image
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 font-medium"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
