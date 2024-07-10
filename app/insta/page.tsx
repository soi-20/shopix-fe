"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RotateLoader from "react-spinners/RotateLoader";

interface CardProps {
  id: number;
  image: string;
  text: string;
}

const InstaPosts = () => {
  const router = useRouter();
  const [results, setResults] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/uploadPosts", {
          method: "GET",
        });
        let data = await response.json();

        const parsedData = data.map((item: any) => {
          let posts = JSON.parse(item.posts);
          return {
            id: item.id,
            image: posts.image,
            text: posts.text,
          };
        });

        setResults(parsedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/insta/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Image
        src="/logo.png"
        alt="logo"
        width={90}
        height={90}
        className="mx-auto mb-8 object-contain rounded-full w-70 h-70 sm:w-90 sm:h-90"
      />

      {loading ? (
        <div className="flex justify-center items-center h-64 mt-20">
          <RotateLoader size={18} color={"#6165C6"} loading={loading} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
          {results.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="block w-full cursor-pointer transform transition-transform duration-300 hover:scale-105 mb-2"
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
                className="w-full h-auto mb-2 object-contain rounded-2xl border-2"
              />
              <p className="flex items-center justify-center font-semibold text-[#6F6F6F] text-sm">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstaPosts;
