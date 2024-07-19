"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Lottie from "lottie-react";
import animationData from "@/public/animation.json";
import Masonry from "react-masonry-css";

interface CardProps {
  id: number;
  image: string;
  title: string;
}

const InstaPosts = () => {
  const router = useRouter();
  const [results, setResults] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPromise = fetch("/api/uploadPosts", {
          method: "GET",
        }).then((response) => response.json());

        const delayPromise = new Promise((resolve) =>
          setTimeout(resolve, 2000)
        );

        const [data] = await Promise.all([fetchPromise, delayPromise]);

        const parsedData = data.map((item: any) => {
          let posts = JSON.parse(item.posts);
          return {
            id: item.id,
            image: posts.image,
            title: posts.title,
          };
        });

        setResults(parsedData);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/insta/${id}`);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
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
          <Lottie
            className="rounded-full"
            animationData={animationData}
            loop={true}
          />
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-6 mt-14 justify-items-center"
          columnClassName="masonry-grid_column"
        >
          {results.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="mb-6 cursor-pointer transform transition-transform duration-300 hover:scale-105"
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
                {card.title}
              </p>
            </div>
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default InstaPosts;
