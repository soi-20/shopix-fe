import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "../skeleton/skeleton";

const ProductCardSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <Card
      className={cn("rounded-xl bg-white shadow-lg hover:shadow-xl", className)}
    >
      <div className="relative flex items-end overflow-hidden rounded-xl">
        <Skeleton className="p-8 rounded-t-lg w-full h-52 bg-gray-200" />
        <div className="absolute bottom-1 left-2 inline-flex items-center rounded-lg border bg-background p-1 shadow">
          <Skeleton className="w-4 h-4 bg-yellow-400" />
          <Skeleton className="ml-1 w-10 h-4 bg-gray-300" />
        </div>
      </div>

      <div className="p-2 mt-1 bg-gray-100">
        <div className="p-2">
          <div className="flex items-center">
            <Skeleton className="w-3/4 h-6 bg-gray-300" />
          </div>

          <div className="mt-3 flex items-end justify-between">
            <p>
              <Skeleton className="w-1/4 h-6 bg-blue-400" />
            </p>

            <div className="flex items-center my-2 gap-2">
              <Skeleton className="w-5 h-5 bg-gray-300" />
              <Skeleton className="w-5 h-5 bg-gray-300" />
            </div>
          </div>

          <Skeleton className="mt-4 w-full h-10 bg-blue-500" />
        </div>
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
