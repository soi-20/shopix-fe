"use client";

import React from "react";
import ProductCard from "@/components/product-card/product-card";
import { SearchWithIcon } from "@/components/search/search";
import { useSearchStore } from "@/store/searchResults";
import SkeletonCard from "@/components/product-card/product-card-skeleton";
import Lottie from 'lottie-react';
import animationData from '@/public/Animation.json'; // Adjust the path if necessary

const SearchPage = () => {
  const results = useSearchStore((state) => state.results);

  console.log(results);

  return (
    <div className={`max-w-5xl mx-auto flex flex-col py-12 px-4 sm:px-6 lg:px-8 ${results.length === 0 ? 'gap-20' : 'gap-32 sm:gap-40'}`}>
      <SearchWithIcon
        placeholder="want something different"
        className="items-center justify-center"
      />

      {results.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <Lottie className="dark:bg-gray-500 bg-gray-200 rounded-full" animationData={animationData} loop={true} />
          <p className="flex justify-center dark:text-gray-500 text-center text-gray-700">We are a young startup, please wait while loading the results. May take up to 45-60 seconds.</p>
        </div>
      ) : ""}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {results.length === 0 ? (
          Array.from({ length: 15 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          results.map((card) => (
            <ProductCard
              className="w-full cursor-pointer"
              key={card.id}
              cardData={card}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
