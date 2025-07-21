import React from 'react';

interface CroppedResultProps {
  image: string;
  onReset: () => void;
}

const CroppedResult: React.FC<CroppedResultProps> = ({ image, onReset }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="max-w-[550px] max-h-[550px] overflow-hidden rounded shadow">
        <img
          src={image}
          alt="Cropped result"
          className="w-full h-auto"
        />
      </div>
      <button
        onClick={onReset}
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        Start Over
      </button>
    </div>
  );
};

export default CroppedResult;
