import React, { useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import CroppedResult from './CroppedResult';

interface Props {
  image: string;
  croppedImage: string | null;
  onCropComplete: (data: string) => void;
  onReset: () => void;
  maxWidth: number;
  maxHeight: number;
  minWidth: number;
  minHeight: number;
  croppedDims: { width: number; height: number };
}

const ImageCropper: React.FC<Props> = ({
  image,
  croppedImage,
  onCropComplete,
  onReset,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  croppedDims
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);

  // Initialize cropper on image load
  useEffect(() => {
    if (imgRef.current) {
      cropperRef.current = new Cropper(imgRef.current, {
        viewMode: 1,
        background: false,
        autoCropArea: 1,
        zoomable: true,
        responsive: true,
        dragMode: 'move',
        cropBoxMovable: true,
        cropBoxResizable: true,
      });
    }

    return () => {
      cropperRef.current?.destroy();
    };
  }, [image]);

  const handleCrop = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas();
      const cropped = canvas.toDataURL('image/jpeg');
      onCropComplete(cropped);
    }
  };

  const handleReset = () => {
    cropperRef.current?.reset();
    cropperRef.current?.zoomTo(0);
    onReset();
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Original Image */}
      <div
        className="overflow-hidden rounded shadow border bg-gray-100 flex items-center justify-center"
        style={{
          maxWidth,
          maxHeight,
          minWidth,
          minHeight,
        }}
      >
        <img
          ref={imgRef}
          src={image}
          alt="To crop"
          className="object-contain w-full h-full"
          style={{ display: 'block' }}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleCrop}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Crop Image
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {/* Cropped Preview */}
      {croppedImage && (
        <CroppedResult image={croppedImage} width={croppedDims.width} height={croppedDims.height} />
      )}
    </div>
  );
};

export default ImageCropper;
