"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/product-card/product-card";
import SkeletonInstaCard from "@/components/skeleton/skeletonInstaCard";

const Wishlist = () => {
  const [likedItems, setLikedItems] = useState([]);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await fetch("/api/fetchWishlistItems");
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist items");
        }
        const data = await response.json();
        setLikedItems(data.wishlistItems);
        setUserId(data.userId);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4">Your wishlist</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
          {[...Array(6)].map((_, index) => (
            <SkeletonInstaCard key={index} />
          ))}
        </div>
      ) : likedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
          {likedItems
            .slice()
            .reverse()
            .map((card, index) => (
              <ProductCard
                className="w-full cursor-pointer"
                key={index}
                cardData={card}
                userId={userId}
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
