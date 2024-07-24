"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/product-card/product-card";

const Wishlist = () => {
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    // Retrieve liked items from localStorage
    const storedLikedItems = localStorage.getItem("likedItems");
    if (storedLikedItems) {
      setLikedItems(JSON.parse(storedLikedItems));
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4">Your wishlist</h2>
      {likedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
          {likedItems
            .slice()
            .reverse()
            .map((card, index) => (
              <ProductCard
                className="w-full cursor-pointer"
                key={index}
                cardData={card}
              />
            ))}
        </div>
      ) : (
        <p>No items in the wishlist.</p>
      )}
    </div>
  );
};

export default Wishlist;
