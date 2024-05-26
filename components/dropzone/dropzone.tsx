"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import ImageIcon from "../icons/image-upload-icon";

interface DropzoneProps {
  onFileChange: (file: File | null) => void; // Callback to handle file changes
  preview: string | null; // URL or base64 string for the preview image
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileChange, preview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the hidden file input

  // Handle file selection from the file input or drag-and-drop
  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      onFileChange(files[0]);
    }
  };

  // Handle paste event to allow pasting images from clipboard
  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image")) {
          const blob = items[i].getAsFile();
          if (blob) {
            onFileChange(blob);
            return;
          }
        }
      }
    }
  };

  // Add and remove paste event listener
  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  // Handle drag-and-drop event to allow dropping images
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    handleFileChange(files);
  };

  // Handle click event to open the file input dialog
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input to allow re-uploading the same file
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className="flex items-center justify-center w-full"
      onDrop={handleDrop} // Enable drag-and-drop functionality
      onDragOver={(e) => e.preventDefault()} // Prevent default behavior for drag over
      onClick={handleClick} // Trigger file input dialog on click
    >
      <div className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer border-b-0 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center w-full h-full pt-5 pb-6">
          {!preview ? ( // Display upload icon if no preview is available
            <>
              <ImageIcon />
              <p className="text-gray-500">OR</p>
            </>
          ) : (
            // Display preview image if available
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
          className="hidden" // Hide the file input
          accept="image/*" // Accept only image files
          ref={fileInputRef} // Reference to the file input
          onChange={(e) => handleFileChange(e.target.files)} // Handle file selection
        />
      </div>
    </div>
  );
};

export default Dropzone;
