"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import InstaCard from "@/components/product-card/insta-card";
import SkeletonInstaCard from "@/components/skeleton/skeletonInstaCard";

type CardData = {
  title: string;
  image: string;
  source_icon?: string;
  price: string;
  link: string;
  source: string;
};

type PostDataProps = {
  id: number;
  title: string;
  image: string;
  price: string;
  link: string;
  source: string;
};

type Results = {
  [key: number]: CardData[];
};

const Searches = () => {
  const [results, setResults] = useState<Results>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("searchResults");

      if (cachedData) {
        setResults(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          const response = await fetch("/api/uploadPosts", {
            method: "GET",
          });
          let data = await response.json();

          const parsedData = data.flatMap(
            (item: { id: number; postdata: string; posts: string }) => {
              try {
                let postData = JSON.parse(item.postdata);
                return postData.map((post: PostDataProps) => {
                  return {
                    id: item.id,
                    title: post.title,
                    image: post.image,
                    price: post.price,
                    link: post.link,
                    source: post.source,
                  };
                });
              } catch (error) {
                console.error("Error parsing data", error);
              }
            }
          );

          let results: Results = {};
          parsedData.forEach((item: PostDataProps) => {
            if (results[item.id]) {
              results[item.id].push(item);
            } else {
              results[item.id] = [item];
            }
          });

          setResults(results);
          localStorage.setItem("searchResults", JSON.stringify(results));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data", error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  const params = useParams<{ id: string }>(); // Specify that `id` is a string
  const id = parseInt(params.id, 10); // Convert to number since your results use numeric keys
  const resultsCurrent = results[id] || [];

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
          {resultsCurrent.map((card, index) => (
            <InstaCard
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
