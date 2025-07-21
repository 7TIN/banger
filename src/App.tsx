
import React, { useState, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageCropper from './components/ImageCropper';
import AddToTwitterButton from './components/AddToTwitterButton';

const MAX_WIDTH = 550;
const MAX_HEIGHT = 550;
const MIN_WIDTH = 300;
const MIN_HEIGHT = 300;

const App = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedDims, setCroppedDims] = useState<{width: number, height: number}>({width: MAX_WIDTH, height: MAX_HEIGHT});

  // When the cropped image changes, calculate its scaled dimensions
  useEffect(() => {
    if (croppedImage) {
      const img = new window.Image();
      img.onload = () => {
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height, 1);
        setCroppedDims({
          width: Math.max(Math.round(width * scale), MIN_WIDTH),
          height: Math.max(Math.round(height * scale), MIN_HEIGHT),
        });
      };
      img.src = croppedImage;
    }
  }, [croppedImage]);

  const handleReset = () => {
    setSelectedImage(null);
    setCroppedImage(null);
  };

  return (
    <div className="w-[600px] h-[800px] flex flex-col bg-white text-gray-800 shadow-lg rounded overflow-hidden mx-auto my-0">
      <p className="text-2xl font-bold px-6 pt-6">Banger</p>

      <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-start gap-6">
        {/* Image input section */}
        {!selectedImage && (
          <ImageUploader onImageSelect={setSelectedImage} />
        )}

        {/* Cropper + Cropped Result Section */}
        {selectedImage && (
          <ImageCropper
            image={selectedImage}
            onCropComplete={setCroppedImage}
            croppedImage={croppedImage}
            onReset={handleReset}
            maxWidth={MAX_WIDTH}
            maxHeight={MAX_HEIGHT}
            minWidth={MIN_WIDTH}
            minHeight={MIN_HEIGHT}
            croppedDims={croppedDims}
          />
        )}
      </main>
    </div>
  );
};

export default App;
