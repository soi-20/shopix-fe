"use client";

import React from "react";
import SearchWithDropzone from "@/components/search/search-with-dropzone";

const HomeVariantPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-center flex-col text-center">
      <p className="text-7xl text-center mb-6 mt-8 sm:mt-28 font-bold text-slate-500">
        shopix
      </p>

      <p className="font-semibold text-gray-400 mb-8">[Ctrl/Cmd + V] an image or image address anywhere on this page 
(product urls ❌)</p>
      </div>

      <SearchWithDropzone placeholder="paste product url" />
    </div>
  );
};

export default HomeVariantPage;
