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
    <div
      id="banger-sidebar"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width:  "400px",
        zIndex: 2147483647,
        boxShadow: "-2px 0 16px rgba(0,0,0,0.15)",
        borderRadius: "12px 0 0 12px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        color: "#222",
        fontFamily: "inherit",
      }}
      className="banger-sidebar"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2 p-2">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-6 w-6" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <h2 className="text-base font-semibold text-gray-800">Crop to Tweet</h2>
        </div>
        <button
          className="text-gray-500 hover:text-red-500 text-2xl font-bold px-2"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          onClick={() => {
            // Only remove the sidebar overlay, not the React root
            const sidebar = document.getElementById('banger-root');
            if (sidebar) sidebar.remove();
          }}
        >
          ×
        </button>
      </div>

      <div className="flex-grow overflow-y-auto space-y-4 px-1 scrollbar-hide">
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
