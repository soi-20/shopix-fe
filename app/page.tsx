"use client";

import Dropzone from "@/components/dropzone/dropzone";
import SearchWithDropzone from "@/components/search/search-with-dropzone";

import React, { useState } from "react";

const HomeVariantPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <p className="text-7xl text-center mb-16 mt-14 sm:mt-28 font-bold text-slate-500">
        shopix
      </p>

      <SearchWithDropzone placeholder="paste product url" />
    </div>
  );
};

export default HomeVariantPage;
