import React from "react";
import { cn } from "@/lib/utils";

const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn("animate-pulse bg-gray-300", className)}></div>;
};

export { Skeleton };
