"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

interface ImageData {
  image: File | null;
  title: string;
  price: string;
  source: string;
  link: string;
  preview: string;
}

const UploadMultiple: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([
    { image: null, title: "", price: "", source: "", link: "", preview: "" },
  ]);

  const [imagePost, setImagePost] = useState<File | null>(null);
  const [postImagePreview, setPostImagePreview] = useState<string>("");

  const handlePostImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImagePost(file);
      setPostImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(images);
  };

  const handleImage = (index: number, file: File) => {
    const newImages = [...images];
    newImages[index].image = file;
    newImages[index].preview = URL.createObjectURL(file);
    setImages(newImages);
  };

  const handleChange = (
    index: number,
    field: keyof ImageData,
    value: string | File
  ) => {
    const newImages = [...images];
    if (field === "image") {
      if (value instanceof File) {
        newImages[index].image = value;
        newImages[index].preview = URL.createObjectURL(value);
      } else {
        console.error("Attempted to set a non-file type to the image field");
      }
    } else {
      if (typeof value === "string") {
        newImages[index][field as "title" | "price" | "source" | "link"] =
          value;
      } else {
        console.error("Attempted to set a non-string type to a string field");
      }
    }
    setImages(newImages);
  };
  const addMoreImages = () => {
    const newImage: ImageData = {
      image: null,
      title: "",
      price: "",
      source: "",
      link: "",
      preview: "",
    };
    setImages([...images, newImage]);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="text-xl font-semibold">Screen 1</label>

        <input
          type="file"
          className="file:bg-gray-600 file:border-none file:rounded-lg file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-gray-500 text-sm text-gray-500"
          onChange={handlePostImageChange}
        />
        {postImagePreview && (
          <Image
            height={100}
            width={100}
            src={postImagePreview}
            alt="Preview"
            className="w-16 h-16 object-cover align-middle"
          />
        )}

        <input
          type="text"
          placeholder="Image Title"
          className="p-3 border rounded-sm text-md border-gray-300"
        />

        <label className="text-xl font-semibold pt-5">Screen 2</label>

        {images.map((img, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <label className="text-lg font-semibold">Post {index + 1}</label>

            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (file) handleImage(index, file);
              }}
              className="file:bg-gray-600 file:border-none file:rounded-lg file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-gray-500 text-sm text-gray-500"
            />
            {img.preview && (
              <Image
                height={100}
                width={100}
                src={img.preview}
                alt="Preview"
                className="w-16 h-16 object-cover mt-2"
              />
            )}
            <input
              type="text"
              value={img.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              placeholder="Item Title"
              className="p-3 border rounded-sm text-md border-gray-300"
            />
            <input
              type="text"
              value={img.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
              placeholder="Price (with currency)"
              className="p-3 border rounded-sm text-md border-gray-300"
            />
            <input
              type="text"
              value={img.source}
              onChange={(e) => handleChange(index, "source", e.target.value)}
              placeholder="Source (e.g., Amazon)"
              className="p-3 border rounded-sm text-md border-gray-300"
            />
            <input
              type="text"
              value={img.link}
              onChange={(e) => handleChange(index, "link", e.target.value)}
              placeholder="Item Link"
              className="p-3 border rounded-sm text-md border-gray-300"
            />
          </div>
        ))}

        <button
          type="button"
          className="bg-gray-200 text-black py-2 hover:bg-gray-400 md:w-[15%] rounded-lg text-sm px-4 w-[20%]"
          onClick={addMoreImages}
        >
          Add More
        </button>
        <label className="text-md font-semibold pt-5 pl-1 text-gray-500">
          Please check before submitting
        </label>
        <button
          type="submit"
          className="bg-[#000] text-white py-2 rounded-lg hover:bg-[#888] md:w-[15%] mt-5 font-semibold w-[20%]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadMultiple;
