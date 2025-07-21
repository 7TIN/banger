/// <reference types="chrome" />

import React, { useState, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageCropper from './components/ImageCropper';
import AddToTwitterButton from './components/AddToTwitterButton';

const MAX_WIDTH = 550;
const MAX_HEIGHT = 550;
const MIN_WIDTH = 150;
const MIN_HEIGHT = 150;

const App = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedDims, setCroppedDims] = useState({ width: MAX_WIDTH, height: MAX_HEIGHT });

  useEffect(() => {
    if (croppedImage) {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(MAX_WIDTH / img.naturalWidth, MAX_HEIGHT / img.naturalHeight, 1);
        setCroppedDims({
          width: Math.max(Math.round(img.naturalWidth * scale), MIN_WIDTH),
          height: Math.max(Math.round(img.naturalHeight * scale), MIN_HEIGHT),
        });
      };
      img.src = croppedImage;
    }
  }, [croppedImage]);

  const handleReset = () => {
    setCroppedImage(null);
    setSelectedImage(null);
    setCroppedDims({ width: MAX_WIDTH, height: MAX_HEIGHT });
  };

  return (
    <div className="w-[600px] h-[800px] bg-white text-gray-900 overflow-hidden flex flex-col rounded shadow-2xl">
      <p className="text-2xl font-bold px-6 pt-4 text-center">Banger</p>
      <main className="flex-1 overflow-y-auto px-6 pb-4 space-y-6 flex flex-col items-center">
        <ImageUploader onImageSelect={setSelectedImage} />

        {selectedImage && (
          <ImageCropper
            image={selectedImage}
            onCropComplete={setCroppedImage}
            maxWidth={MAX_WIDTH}
            maxHeight={MAX_HEIGHT}
            minWidth={MIN_WIDTH}
            minHeight={MIN_HEIGHT}
          />
        )}

        {croppedImage && (
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Cropped Result</h2>
            <div
              style={{
                width: croppedDims.width,
                height: croppedDims.height,
              }}
              className="rounded shadow overflow-hidden"
            >
              <img
                src={croppedImage}
                alt="Cropped"
                className="object-contain w-full h-full"
              />
            </div>
            <AddToTwitterButton image={croppedImage} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
