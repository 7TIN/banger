import type { ChangeEvent } from "react";

type Props = {
  onImageChange: (file: string) => void;
};

export default function ImageUploader({ onImageChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => onImageChange(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <input
    title="input image"
      type="file"
      accept="image/*"
      onChange={handleChange}
      className="mb-4"
    />
  );
}
