"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import InstaCard from "@/components/product-card/insta-card";

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
  [key: number]: CardData[]; // Assumes that the keys are numbers
};

const Searches = () => {
  // fetch these results from the api now
  const [results, setResults] = useState<Results>({});

  // we will need the 3rd column and we will need to create this 0 1 mapping ourselves

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/uploadPosts", {
          method: "GET",
        });
        let data = await response.json();
        console.log("data", data);

        // there are 3 columns, we need to parse out the 2nd column
        const parsedData = data.map(
          (item: { id: number; postdata: string; posts: string }) => {
            try {
              let postData = JSON.parse(item.postdata);
              return {
                id: item.id,
                title: postData[0].title,
                image: postData[0].image,
                price: postData[0].price,
                link: postData[0].link,
                source: postData[0].source,
              };
            } catch (error) {
              console.error("Error parsing data", error);
            }
          }
        );

        // we will need to create a 0 1 mapping
        let results: Results = {};
        parsedData.forEach((item: PostDataProps) => {
          if (results[item.id]) {
            results[item.id].push(item);
          } else {
            results[item.id] = [item];
          }
        });

        setResults(results);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const params = useParams<{ id: string }>(); // Specify that `id` is a string
  const id = parseInt(params.id, 10); // Convert to number since your results use numeric keys
  const resultsCurrent = results[id] || [];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
        {resultsCurrent.map((card, index) => (
          <InstaCard
            key={index}
            className="w-full cursor-pointer"
            cardData={card}
          />
        ))}
      </div>
    </div>
  );
};

export default Searches;
