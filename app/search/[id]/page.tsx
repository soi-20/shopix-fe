"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/product-card/product-card";
import SkeletonInstaCard from "@/components/skeleton/skeletonInstaCard";

const Searches = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getSearchResult/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data = await response.json();
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
          {[...Array(6)].map((_, index) => (
            <SkeletonInstaCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
          {results.map((card, index) => (
            <ProductCard
              key={index}
              className="w-full cursor-pointer"
              cardData={card}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Searches;
