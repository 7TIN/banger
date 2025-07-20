type Props = {
  croppedImage: string;
};

export default function CroppedResult({ croppedImage }: Props) {
  return (
    <div className=" max-w-[550px] max-h-[550px] w-auto h-auto flex justify-center mt-4">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-600">Cropped Result</p>
        <img
          src={croppedImage}
          alt="Cropped"
          className="object-contain rounded shadow"
        />
      </div>
    </div>
  );
}
