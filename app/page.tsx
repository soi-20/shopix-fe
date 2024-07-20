"use client";

import React from "react";
import SearchWithDropzone from "@/components/search/search-with-dropzone";

const HomeVariantPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SearchWithDropzone placeholder="paste product url" />
    </div>
  );
};

export default HomeVariantPage;
