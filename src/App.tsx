/// <reference types="chrome" />

import { useRef, useState } from "react";
import ImageUploader from "./components/ImageUploader";
import ImageCropper from "./components/ImageCropper";
import CroppedResult from "./components/CroppedResult";
import Cropper from "cropperjs";

export default function App() {
  const [image, setImage] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  return (
    <div className="w-[600px] h-[500px] p-4 flex flex-col items-center overflow-auto bg-white text-center space-y-4">
      <h2 className="text-lg font-semibold">Image Cropper</h2>

      <ImageUploader onImageChange={setImage} />

      {image && (
        <ImageCropper
          image={image}
          onCrop={setCroppedImage}
          onInit={(cropper) => (cropperRef.current = cropper)}
        />
      )}

      {croppedImage && <CroppedResult croppedImage={croppedImage} />}

      <button
        onClick={() => {
          if (croppedImage) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              const tabId = tabs[0].id;
              if (tabId && croppedImage) {
                chrome.scripting.executeScript({
                  target: { tabId },
                  func: (imageDataUrl: string) => {
                    const input = document.querySelector(
                      'input[type="file"]'
                    ) as HTMLInputElement;
                    if (!input) {
                      alert("Twitter upload input not found.");
                      return;
                    }
                    fetch(imageDataUrl)
                      .then((res) => res.blob())
                      .then((blob) => {
                        const file = new File([blob], "cropped.png", {
                          type: blob.type,
                        });
                        const dt = new DataTransfer();
                        dt.items.add(file);
                        input.files = dt.files;
                        input.dispatchEvent(
                          new Event("change", { bubbles: true })
                        );
                      });
                  },
                  args: [croppedImage],
                });
              }
            });
          }
        }}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add to Twitter Post
      </button>
    </div>
  );
}
