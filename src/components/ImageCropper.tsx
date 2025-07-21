import React, { useRef, useEffect, useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

type Props = {
  image: string;
  onCropComplete: (base64: string) => void;
  maxWidth: number;
  maxHeight: number;
  minWidth: number;
  minHeight: number;
};

export default function ImageCropper({
  image,
  onCropComplete,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight
}: Props) {
  const imageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);
  const [dims, setDims] = useState({ width: maxWidth, height: maxHeight });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      let scale = Math.min(maxWidth / width, maxHeight / height, 1);
      width = Math.round(width * scale);
      height = Math.round(height * scale);

      // If width is less than min, scale up (if possible)
      if (width < minWidth) {
        scale = minWidth / width;
        width = minWidth;
        height = Math.round(height * scale);
        // Clamp height to maxHeight
        if (height > maxHeight) {
          scale = maxHeight / height;
          height = maxHeight;
          width = Math.round(width * scale);
        }
      }
      // If height is less than min, scale up (if possible)
      if (height < minHeight) {
        scale = minHeight / height;
        height = minHeight;
        width = Math.round(width * scale);
        // Clamp width to maxWidth
        if (width > maxWidth) {
          scale = maxWidth / width;
          width = maxWidth;
          height = Math.round(height * scale);
        }
      }
      setDims({ width, height });
    };
    img.src = image;
  }, [image, maxWidth, maxHeight, minWidth, minHeight]);

  useEffect(() => {
    if (imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        viewMode: 1,
        autoCropArea: 1,
        responsive: true,
        dragMode: 'move',
        background: false,
        cropBoxResizable: true,
        cropBoxMovable: true,
        checkOrientation: false,
        toggleDragModeOnDblclick: false
      });
    }
    return () => { cropperRef.current?.destroy(); };
  }, [image]);

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      const base64 = croppedCanvas.toDataURL('image/jpeg');
      onCropComplete(base64);
    }
  };

  const handleReset = () => {
    cropperRef.current?.reset();
    cropperRef.current?.zoomTo(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="rounded overflow-hidden shadow"
        style={{ width: dims.width, height: dims.height }}
      >
        <img
          ref={imageRef}
          src={image}
          alt="To crop"
          style={{ width: dims.width, height: dims.height }}
          className="object-contain"
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleCrop}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium"
          aria-label="Crop Image"
        >
          Crop Image
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded font-medium"
          aria-label="Reset Cropper"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
