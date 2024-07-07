"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const InstaPosts = () => {
  const router = useRouter();

  let results = [
    {
      id: 0,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
    },
    {
      id: 1,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
    },
    {
      id: 2,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
    },
    {
      id: 3,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
    },
    {
      id: 4,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
    },
    {
      id: 5,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
    },
    {
      id: 6,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
    },
    {
      id: 7,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
    },
  ];

  const handleCardClick = (id: number) => {
    router.push(`/insta/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Image
        src="/logo.png"
        alt="logo"
        width={70}
        height={70}
        className="mx-auto mb-8 object-contain rounded-full"
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
        {results.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="block w-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Image
              width={200}
              height={200}
              src={card.image}
              alt="product image"
              className="w-full h-auto mb-4 object-contain rounded-2xl border-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstaPosts;
