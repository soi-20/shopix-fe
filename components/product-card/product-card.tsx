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
    image: string;
    title: string;
    rating: string; // Rating as a string in the format "x/y"
    price: string; // Price as a string with currency symbol
    logo: string; // Base64 encoded logo
    link: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  cardData,
  className,
  ...props
}) => {
  // Parse the rating
  const [ratingValue, ratingMax] = cardData.rating.split("/").map(Number);
  const rating = (ratingValue / ratingMax) * 5;

  return (
    <Card
      className={cn(
        "rounded-xl bg-secondary shadow-lg hover:shadow-xl overflow-hidden flex flex-col",
        className
      )}
    >
      <div className="relative bg-primary-foreground flex items-end overflow-hidden rounded-xl">
        <Image
          width={100}
          height={100}
          src={cardData.image}
          alt="product image"
          className="p-8 rounded-t-lg w-full h-52 object-contain"
        />
        <div className="absolute bottom-1 left-2 inline-flex items-center rounded-lg border bg-background p-1 shadow">
          <StarIcon width={12} height={12} className="text-yellow-400" />
          <span className="text-slate-400 ml-1 text-xs">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="p-2 mt-1 bg-secondary flex flex-col flex-grow justify-between">
        <div className="flex-grow p-2">
          <div className="flex items-center">
            <h5 className="text-lg font-semibold tracking-tight text-primary/90 line-clamp-2">
              {cardData.title}
            </h5>
          </div>
        </div>

        <div className="p-2 mt-auto">
          <div className="flex items-center justify-between mb-2">
            <p>
              <span className="text-lg font-bold text-primary/90">
                {cardData.price}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <Image
                width={100}
                height={100}
                src={cardData.logo}
                alt="source website logo"
                className="w-5 h-5"
              />

              <ShareIcon className="text-primary" />
            </div>
          </div>

          <Link href={cardData.link} target="_blank">
            <Button className="w-full">Buy Now</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
