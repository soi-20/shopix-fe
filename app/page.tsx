"use client";

import React from "react";
import Navbar from "@/components/navbar/navbar";
import SearchWithDropzone from "@/components/search/search-with-dropzone";

const HomeVariantPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchWithDropzone placeholder="paste product url" />
    </div>
  );
};

export default HomeVariantPage;
