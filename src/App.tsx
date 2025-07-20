/// <reference types="chrome" />

import { useRef, useState } from "react";
import ImageUploader from "./components/ImageUploader";
import ImageCropper from "./components/ImageCropper";
import CroppedResult from "./components/CroppedResult";
import Cropper from "cropperjs";
import AddToTwitterButton from "./components/AddToTwitterButton";

export default function App() {
  const [image, setImage] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  return (
    <div className="fixed top-0 right-0 z-50 rounded-l-xl w-[600px] h-screen overflow-y-auto p-4 bg-white shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-6 w-6" />
          <h2 className="text-base font-semibold text-gray-800">Crop to Tweet</h2>
        </div>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={() => window.close()}>×</button>
      </div>

      <div className="flex-grow overflow-auto space-y-4 px-1 scrollbar-hide">
        <ImageUploader onImageChange={(img) => {
        setImage(img);
        setCroppedImage("");
      }} />

      {image && (
        <ImageCropper
          image={image}
          onCrop={setCroppedImage}
          onInit={(cropper) => (cropperRef.current = cropper)}
        />
      )}

      {croppedImage && <CroppedResult croppedImage={croppedImage} />}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 flex justify-between items-center text-xs text-gray-500">
        {croppedImage && <AddToTwitterButton croppedImage={croppedImage} />}
      </div>
    </div>
  );
}
