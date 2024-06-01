import { Loader } from 'lucide-react';
import React, { FC } from 'react';

const LoadingScreen: FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg gap-4 p-8 flex flex-col items-center">
        <Loader className="h-10 w-10 animate-spin" />
        <h2 className="text-center text-xl font-semibold">Loading...</h2>
        <p className="w-2/3 whitespace-nowrap flex justify-center  text-center text-gray-700">We are a young startup<br/> please wait while loading the results<br/>may take upto 45-60 seconds</p>
      </div>
    </div>
  );
};

export default LoadingScreen;