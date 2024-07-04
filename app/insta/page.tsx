"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/product-card/product-card";

const InstaPosts = () => {
  const router = useRouter();

  let results = [
    {
      title: "Van Heusen Men Slim Fit Shirt",
      id: 0,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
      logo: "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcR2emfet7RmzmPRsHjYm_UPCTAgzmbvxRasG6I2u0I4LbQ54ZknecWGFOlBWs77JqzWT4yV05Z70DroaUwrYGlJKA1RUCO8YFzPxNBQf8kSXLfu",
      price: "₹1,789.00",
      link: "https://www.google.com",
    },
    {
      title: "Van Heusen Men Slim Fit Shirt",
      id: 1,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
      logo: "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcR2emfet7RmzmPRsHjYm_UPCTAgzmbvxRasG6I2u0I4LbQ54ZknecWGFOlBWs77JqzWT4yV05Z70DroaUwrYGlJKA1RUCO8YFzPxNBQf8kSXLfu",
      price: "₹1,789.00",
      link: "https://www.google.com",
    },
    {
      title: "Van Heusen Men Slim Fit Shirt",
      id: 2,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
      logo: "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcR2emfet7RmzmPRsHjYm_UPCTAgzmbvxRasG6I2u0I4LbQ54ZknecWGFOlBWs77JqzWT4yV05Z70DroaUwrYGlJKA1RUCO8YFzPxNBQf8kSXLfu",
      price: "₹1,789.00",
      link: "https://www.google.com",
    },
    {
      title: "Van Heusen Men Slim Fit Shirt",
      id: 3,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
      logo: "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcR2emfet7RmzmPRsHjYm_UPCTAgzmbvxRasG6I2u0I4LbQ54ZknecWGFOlBWs77JqzWT4yV05Z70DroaUwrYGlJKA1RUCO8YFzPxNBQf8kSXLfu",
      price: "₹1,789.00",
      link: "https://www.google.com",
    },
    {
      title: "Van Heusen Men Slim Fit Shirt",
      id: 4,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
      logo: "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcR2emfet7RmzmPRsHjYm_UPCTAgzmbvxRasG6I2u0I4LbQ54ZknecWGFOlBWs77JqzWT4yV05Z70DroaUwrYGlJKA1RUCO8YFzPxNBQf8kSXLfu",
      price: "₹1,789.00",
      link: "https://www.google.com",
    },
    {
      title: "Van Heusen Men Slim Fit Shirt",
      id: 5,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
      logo: "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcR2emfet7RmzmPRsHjYm_UPCTAgzmbvxRasG6I2u0I4LbQ54ZknecWGFOlBWs77JqzWT4yV05Z70DroaUwrYGlJKA1RUCO8YFzPxNBQf8kSXLfu",
      price: "₹1,789.00",
      link: "https://www.google.com",
    },
    {
      title: "Van Heusen Men Slim Fit Shirt",
      id: 6,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
      logo: "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcR2emfet7RmzmPRsHjYm_UPCTAgzmbvxRasG6I2u0I4LbQ54ZknecWGFOlBWs77JqzWT4yV05Z70DroaUwrYGlJKA1RUCO8YFzPxNBQf8kSXLfu",
      price: "₹1,789.00",
      link: "https://www.google.com",
    },
    {
      title: "Van Heusen Men Slim Fit Shirt",
      id: 7,
      image: "https://m.media-amazon.com/images/I/51k4kM80q3L._SY606_.jpg",
      logo: "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcR2emfet7RmzmPRsHjYm_UPCTAgzmbvxRasG6I2u0I4LbQ54ZknecWGFOlBWs77JqzWT4yV05Z70DroaUwrYGlJKA1RUCO8YFzPxNBQf8kSXLfu",
      price: "₹1,789.00",
      link: "https://www.google.com",
    },
  ];

  const handleCardClick = (id: number) => {
    router.push(`/insta/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
        {results.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="block w-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <ProductCard className="w-full cursor-pointer" cardData={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstaPosts;
