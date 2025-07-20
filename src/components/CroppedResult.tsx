
type Props = {
  croppedImage: string;
};

export default function CroppedResult({ croppedImage }: Props) {
  return (
    <div className="border mt-4 rounded overflow-hidden">
      <img src={croppedImage} alt="Cropped" className="w-full" />
    </div>
  );
}
