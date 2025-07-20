
/// <reference types="chrome" />

type Props = {
  croppedImage: string;
};

export default function AddToTwitterButton({ croppedImage }: Props) {
  const handleAdd = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      if (!tabId) return;

      chrome.scripting.executeScript({
        target: { tabId },
        func: (imageDataUrl: string) => {
          const input = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (!input) {
            alert("Twitter upload input not found.");
            return;
          }

          fetch(imageDataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const file = new File([blob], "cropped.png", { type: blob.type });
              const dt = new DataTransfer();
              dt.items.add(file);
              input.files = dt.files;
              input.dispatchEvent(new Event("change", { bubbles: true }));
            });
        },
        args: [croppedImage],
      });
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition"
    >
      Add to Twitter Post
    </button>
  );
}
