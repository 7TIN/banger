import React from 'react';
import AddToTwitterButton from './AddToTwitterButton';

interface CroppedResultProps {
  image: string;
  width: number;
  height: number;
}

const CroppedResult: React.FC<CroppedResultProps> = ({ image, width, height }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-lg text-gray-600 font-medium">Cropped Result</span>
      <div
        className="overflow-hidden rounded bg-white shadow"
        style={{ width, height }}
      >
        <img
          src={image}
          alt="Cropped"
          className="object-contain max-w-full max-h-full"
          style={{ width, height }}
        />
      </div>
      <AddToTwitterButton image={image} />
    </div>
  );
};

export default CroppedResult;
