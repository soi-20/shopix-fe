import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import ShareIcon from "../icons/share-icon";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { StarIcon } from "../icons/star-icon";

interface ProductCardProps {
  className?: string;
  cardData: {
    delivery?:string;
    image: string;
    title: string;
    rating?: string; // Rating as a string in the format "x/y"
    price: string; // Price as a string with currency symbol
    logo: string; // Base64 encoded logo
    link: string;
    source: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  cardData,
  className,
  ...props
}) => {
  // Parse the rating
  let ratingCheck;
  if(!(cardData.rating === undefined)){
    const [ratingValue, ratingMax] = cardData.rating.split("/").map(Number);
    ratingCheck = (ratingValue / ratingMax) * 5;
  } else {
    ratingCheck = 0; 
  }

  let logoCheck;
  if(!(cardData.logo === undefined)){
    logoCheck = cardData.logo;
  } else {
    logoCheck = "no logo";
  }

  let deliveryCheck;
  if(!(cardData.delivery === undefined)){
    deliveryCheck = cardData.delivery;
  } else {
    deliveryCheck = "";
  }

  return (
    <Card
      className={cn(
        "rounded-xl relative min-h-80 shadow-lg hover:shadow-xl overflow-hidden flex flex-col",
        className
      )}
    >
      <div className="relative cursor-auto rounded-xl bg-gray-100 dark:bg-secondary/30 flex items-center justify-center overflow-hidden rounded-t-xl">
        <div className="p-4 pb-3">
          <Image
            width={200}
            height={200}
            src={cardData.image}
            alt="product image"
            className="w-40 h-48 mb-4 object-contain rounded-2xl border-2"
          />
          <div className="flex items-center rounded-md bg-gray-200 dark:bg-secondary justify-center overflow-hidden w-40 whitespace-nowrap"><p className="font-semibold overflow-hidden">{cardData.source}</p></div>
        </div>
        {cardData.rating === "NA" ? "" : (
          ratingCheck === 0 ? "" : (
            <div className="absolute bottom-2 left-2 flex items-center bg-white dark:bg-secondary p-1 rounded">
            <StarIcon width={12} height={12} className="text-yellow-400" />
            <span className="text-primary ml-1 text-sm font-medium">
              {ratingCheck.toFixed(1)}
            </span>
          </div>
          )
        )}

        {logoCheck == "no logo" ? "" : (
          <div className="absolute bottom-2 right-2 flex items-center bg-white dark:bg-secondary p-1 rounded">
          <Image
            width={100}
            height={100}
            src={cardData.logo}
            alt="source website logo"
            className="w-5 h-5"
            />
        </div>
        )}
      </div>

      {/* {deliveryCheck === "" ? "" : (
        <div className="absolute text-sm w-40 bottom-2 left-2 bg-secondary rounded-lg">
          {deliveryCheck}
        </div>
      )} */}

      <div className="p-4 cursor-auto flex flex-col flex-grow justify-between">
        <h5 className="text-lg text-gray-600 dark:text-gray-300 font-semibold mb-4 line-clamp-2">
          {cardData.title}
        </h5>
        <div className="flex flex-row items-center justify-between w-full">
              {cardData.price === 'NA' ? "" : <div className="flex items-center justify-start font-bold w-full text-xl overflow-hidden whitespace-nowrap"><p className="mr-4 overflow-hidden">{cardData.price}</p></div>}
          <Link href={cardData.link} target="_blank" className="w-full flex justify-end">
            <Button className="w-full text-lg h-9 flex items-center justify-center">
              Buy Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
