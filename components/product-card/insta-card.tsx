import React from "react";
import { Card } from "../ui/insta-card";
import Image from "next/image";
import ShareIcon from "../icons/share-icon";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { StarIcon } from "../icons/star-icon";

interface InstaCardProps {
  className?: string;
  cardData: {
    delivery?: string;
    thumbnail: string;
    title: string;
    rating?: string; // Rating as a string in the format "x/y"
    price: string; // Price as a string with currency symbol
    source_icon: string; // Base64 encoded logo
    link: string;
    source?: string;
  };
}

const InstaCard: React.FC<InstaCardProps> = ({
  cardData,
  className,
  ...props
}) => {
  // Parse the rating
  let ratingCheck;
  if (!(cardData.rating === undefined)) {
    const [ratingValue, ratingMax] = cardData.rating.split("/").map(Number);
    ratingCheck = (ratingValue / ratingMax) * 5;
  } else {
    ratingCheck = 0;
  }

  let logoCheck;
  if (!(cardData.source_icon === undefined)) {
    logoCheck = cardData.source_icon;
  } else {
    logoCheck = "no logo";
  }

  let deliveryCheck;
  if (!(cardData.delivery === undefined)) {
    deliveryCheck = cardData.delivery;
  } else {
    deliveryCheck = "";
  }

  return (
    <Card
      className={cn(
        "relative min-h-80 overflow-hidden flex flex-col",
        className
      )}
    >
      <div className="relative cursor-auto flex items-center justify-center overflow-hidden bg-[#F5F4F2]">
        <div className="bg-[#FCFAFA]" style={{ width: "90%", height: "90%" }}>
          <div className="sm:w-auto h-96 w-auto">
            <Image
              width={200}
              height={200}
              src={cardData.thumbnail}
              alt="product image"
              className="object-contain absolute top-0 left-0 right-0 bottom-0 w-full h-full object-contain mx-auto p-6 pt-10 pb-10"
            />
            {/* <div className="flex items-center rounded-md bg-gray-200 dark:bg-secondary justify-center overflow-hidden w-40 whitespace-nowrap">
            <p className="font-semibold overflow-hidden">{cardData.source}</p>
            </div> */}
          </div>
        </div>
        {cardData.rating === "NA" ? (
          ""
        ) : ratingCheck === 0 ? (
          ""
        ) : (
          <div className="absolute bottom-2 left-2 flex items-center bg-white dark:bg-secondary p-1 rounded">
            <StarIcon width={12} height={12} className="text-yellow-400" />
            <span className="text-primary ml-1 text-sm font-medium">
              {ratingCheck.toFixed(1)}
            </span>
          </div>
        )}

        {logoCheck == "no logo" ? (
          ""
        ) : (
          <div className="absolute top-2 right-2 flex items-center bg-white dark:bg-secondary p-1 rounded">
            <Image
              width={150}
              height={150}
              src={cardData.source_icon}
              alt="source website logo"
              className="w-7 h-7"
            />
          </div>
        )}
      </div>

      {/* {deliveryCheck === "" ? "" : (
        <div className="absolute text-sm w-40 bottom-2 left-2 bg-secondary rounded-lg">
          {deliveryCheck}
        </div>
      )} */}

      <div className="p-4 cursor-auto flex flex-col flex-grow justify-between bg-[#F5F4F2] pt-0">
        <h5 className="text-sm text-[#6F6F6F] dark:text-gray-400 font-semibold line-clamp-2">
          {cardData.title}
        </h5>
        <div className="flex flex-row items-center justify-between w-full">
          {cardData.price === "NA" ? (
            ""
          ) : (
            <div className="flex items-center justify-start font-semibold w-full text-lg overflow-hidden whitespace-nowrap">
              <p className="mr-4 overflow-hidden text-[#000000]">
                {cardData.price}
              </p>
            </div>
          )}
        </div>
        <Link
          href={cardData.link}
          target="_blank"
          className="w-full flex justify-center"
        >
          <Button className="w-full text-md flex items-center justify-center mt-1 bg-[#444444] text-white rounded-l hover:bg-[#333333]">
            Buy Now
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default InstaCard;
