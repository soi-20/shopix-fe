//dropzone.tsx
import React, { useState } from "react";
import Image from "next/image";
import ImageIcon from "../icons/image-upload-icon";

interface DropzoneProps {
  onFileChange: (files: FileList | null) => void;
  preview: string | null; // Add preview as a prop
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileChange, preview }) => {
  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      onFileChange(files);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer border-b-0 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center w-full h-full pt-5 pb-6">
          {!preview ? (
            <>
              <ImageIcon />
              <p className="text-gray-500">OR</p>
            </>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={preview}
                alt="Preview"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </label>
    </div>
  );
};

export default Dropzone;
