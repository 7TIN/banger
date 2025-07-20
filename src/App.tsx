import { useRef, useState } from "react"
import ImageUploader from "./components/ImageUploader"
import ImageCropper from "./components/ImageCropper"
import CroppedResult from "./components/CroppedResult"
import Cropper from "cropperjs"

export default function App() {
  const [image, setImage] = useState<string>("")
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const cropperRef = useRef<Cropper | null>(null)

  return (
    <div className="p-4 text-center space-y-4">
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
    </div>
  )
}
