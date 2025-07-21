import React from 'react';
import AddToTwitterButton from './AddToTwitterButton';

interface Props {
  image: string;
  width: number;
  height: number;
}

const CroppedResult: React.FC<Props> = ({ image, width, height }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-base text-gray-500 font-medium">Cropped Result</span>
      <div
        className="overflow-hidden rounded shadow border bg-white flex items-center justify-center"
        style={{ width, height }}
      >
        <img
          src={image}
          alt="Cropped"
          className="object-contain w-full h-full"
        />
      </div>
      <AddToTwitterButton image={image} />
    </div>
  );
};

export default CroppedResult;
