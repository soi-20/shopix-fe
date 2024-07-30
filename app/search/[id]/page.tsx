"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/product-card/product-card";
import SkeletonInstaCard from "@/components/skeleton/skeletonInstaCard";
import { SearchWithIcon } from "@/components/search/search";
import { useSession } from "next-auth/react";

const Searches = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const session = useSession();
  const userId = session?.data?.user?.id;
  // const searchResults = useSearchStore((state) => state.results);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCached = localStorage.getItem(`searchResults_${id}`);
        const imageCached = localStorage.getItem(`image_url_${id}`);
        if (responseCached) {
          setResults(JSON.parse(responseCached));
          setImageUrl(imageCached);
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/getSearchResult/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data = await response.json();
        setResults(data.data.results);
        setImageUrl(data.data.image_url);
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
      <SearchWithIcon
        placeholder="want something different"
        className="items-center justify-center mb-6"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
          {[...Array(6)].map((_, index) => (
            <SkeletonInstaCard key={index} />
          ))}
        </div>
      ) : (
        <div>
          {imageUrl && (
            <div className="flex justify-center items-center mb-6">
              <Image
                src={imageUrl}
                alt="searched product"
                width={200}
                height={200}
                className="w-24 h-auto rounded-lg"
              />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
            {results.map((card, index) => (
              <ProductCard
                key={index}
                className="w-full cursor-pointer"
                cardData={card}
                userId={userId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Searches;
