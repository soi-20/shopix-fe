import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader } from 'lucide-react';

const SkeletonCard: React.FC = () => {
  return (
    <>
    <Card className="rounded-xl w-full relative min-h-80 shadow-lg overflow-hidden flex flex-col">
      <div className="relative cursor-auto rounded-xl bg-gray-100 dark:bg-secondary/30 flex items-center justify-center overflow-hidden rounded-t-xl">
        <div className="p-4 pb-3">
          <Skeleton className="w-40 h-48 mb-4 rounded-2xl" />
          <Skeleton className="w-40 h-6 rounded-md" />
        </div>
      </div>

      <div className="p-4 cursor-auto flex flex-col flex-grow justify-between">
        <Skeleton className="h-5 w-full mb-4" />
        <div className="flex flex-row items-center justify-between w-full">
          <Skeleton className="w-24 h-6 mr-4" />
          <Skeleton className="w-20 h-9 rounded-md" />
        </div>
      </div>
    </Card>
    </>
  );
};

export default SkeletonCard;