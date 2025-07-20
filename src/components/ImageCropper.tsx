import { useRef } from "react"
import { Cropper, type ReactCropperElement } from "react-cropper"
import "cropperjs/dist/cropper.css"

type Props = {
  image: string
  onCrop: (dataUrl: string) => void
  onInit?: (cropper: Cropper) => void
}

export default function ImageCropper({ image, onCrop, onInit }: Props) {
  const cropperRef = useRef<ReactCropperElement>(null)

  const cropImage = () => {
    const cropper = cropperRef.current?.cropper
    if (cropper) {
      const cropped = cropper.getCroppedCanvas().toDataURL()
      onCrop(cropped)
    }
  }

  const resetCrop = () => {
    const cropper = cropperRef.current?.cropper
    cropper?.reset()
    cropper?.zoomTo(0)
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Cropper
        src={image}
        ref={(ref) => {
          if (ref && "cropper" in ref) {
            cropperRef.current = ref
            onInit?.(ref.cropper)
          }
        }}
        viewMode={1}
        background={false}
        autoCropArea={1}
        zoomable
        responsive
        checkOrientation={false}
        dragMode="move"
        cropBoxMovable
        cropBoxResizable
        style={{ height: "auto", width: "100%", maxWidth: "500px" }}
      />

      <div className="flex gap-4">
        <button
          onClick={cropImage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crop Image
        </button>
        <button
          onClick={resetCrop}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
