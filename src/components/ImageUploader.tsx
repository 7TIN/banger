import React from 'react';

interface Props {
  onImageSelect: (base64: string) => void;
}

const ImageUploader: React.FC<Props> = ({ onImageSelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onImageSelect(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <label className="text-sm text-gray-600 font-medium">Upload an image to crop</label>
      <input title='input'
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-full file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};

export default ImageUploader;
