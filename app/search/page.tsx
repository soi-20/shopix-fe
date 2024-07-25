"use client";

import React from "react";
import ProductCard from "@/components/product-card/product-card";
import { SearchWithIcon } from "@/components/search/search";
import { useSearchStore } from "@/store/searchResults";
import { useEffect, useState } from "react";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

const SearchPage = () => {
  const results = useSearchStore((state) => state.results);

  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchSession = async () => {
      const { isAuthenticated, session } = await checkIsAuthenticated();
      if (isAuthenticated) {
        setUserId(session?.user?.id);
      }
    };

    fetchSession();
  }, []);

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
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
