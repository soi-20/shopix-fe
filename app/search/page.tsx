"use client";

import React from "react";
import ProductCard from "@/components/product-card/product-card";
import { SearchWithIcon } from "@/components/search/search";
import { useSearchStore } from "@/store/searchResults";

const SearchPage = () => {
  const results = useSearchStore((state) => state.results);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SearchWithIcon
        placeholder="want something different"
        className="items-center justify-center"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
        {results.map((card) => (
          <ProductCard
            className="w-full cursor-pointer"
            key={card.id}
            cardData={card}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
