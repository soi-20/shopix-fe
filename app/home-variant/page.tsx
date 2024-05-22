"use client";

import Dropzone from "@/components/dropzone/dropzone";
import { SearchWithDropzone } from "@/components/search/search";
import React, { useState } from "react";

const HomeVariantPage = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      // Handle file upload
      console.log(files[0]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <p className="text-7xl text-center mb-16 mt-14 sm:mt-28 font-bold text-slate-500">
        shopix
      </p>

      <SearchWithDropzone
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
        placeholder="paste product url"
        onFileChange={handleFileChange}
      />
    </div>
  );
};

export default HomeVariantPage;
