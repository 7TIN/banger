/// <reference types="chrome" />

import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageCropper from './components/ImageCropper';
import AddToTwitterButton from './components/AddToTwitterButton';

const MAX_WIDTH = 550;
const MAX_HEIGHT = 550;

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedDims, setCroppedDims] = useState<{width: number, height: number}>({width: MAX_WIDTH, height: MAX_HEIGHT});

  // When croppedImage changes, get its size for dynamic container
  React.useEffect(() => {
    if (croppedImage) {
      const img = new window.Image();
      img.onload = () => {
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height, 1);
        setCroppedDims({
          width: Math.round(width * scale),
          height: Math.round(height * scale)
        });
      };
      img.src = croppedImage;
    }
  }, [croppedImage]);

  return (
    <div className="w-[600px] h-[800px] flex flex-col bg-white text-gray-800 shadow-lg rounded overflow-hidden mx-auto my-0">

      <main className="flex-1 overflow-y-auto p-6 bg-white flex flex-col items-center justify-center scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {!selectedImage && (
          <ImageUploader onImageSelect={setSelectedImage} />
        )}

        {selectedImage && (
          <div className="flex flex-col items-center gap-8max-h-[550px] max-w-[550px] h-auto w-auto">
            <ImageCropper
              image={selectedImage}
              onCropComplete={setCroppedImage}
            />
            {croppedImage && (
              <div className="w-full flex flex-col items-center gap-3">
                <span className="text-base text-gray-500 font-medium mb-1">Cropped Result</span>
                <div
                  className="overflow-hidden rounded shadow border bg-white flex items-center justify-center mx-auto"
                  style={{
                    maxWidth: MAX_WIDTH,
                    maxHeight: MAX_HEIGHT,
                    width: croppedDims.width,
                    height: croppedDims.height,
                    display: 'inline-block',
                  }}
                >
                  <img
                    src={croppedImage}
                    alt="Cropped result"
                    className="max-w-full max-h-full object-contain"
                    style={{ width: croppedDims.width, height: croppedDims.height }}
                  />
                </div>
                <AddToTwitterButton image={croppedImage} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
