import React from "react";
import { cn } from "@/lib/utils";

const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn("animate-pulse dark:bg-gray-400 bg-gray-800", className)}></div>;
};

export { Skeleton };
