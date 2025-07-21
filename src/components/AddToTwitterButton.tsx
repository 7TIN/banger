
/// <reference types="chrome" />

import React from 'react';

interface AddToTwitterButtonProps {
  image: string;
}

const AddToTwitterButton: React.FC<AddToTwitterButtonProps> = ({ image }) => {
  const handleAddToTwitter = () => {
    // Convert base64 to blob
    const base64Response = fetch(image);
    base64Response.then(res => res.blob()).then(blob => {
      // Create a File from the blob
      const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
      
      // Create form data
      const formData = new FormData();
      formData.append('image', file);

      // TODO: Send to Twitter API or your backend
      console.log('Sending to Twitter:', formData);
    });
  };

  return (
    <button
      onClick={handleAddToTwitter}
      className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
      Add to Twitter
    </button>
  );
};

export default AddToTwitterButton;
