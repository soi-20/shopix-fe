"use client";

import React, { useState } from "react";
import { SearchWithIcon, SearchWithDropzone } from "../search/search";
import Link from "next/link";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="pt-64">
      {/* title */}

      <p className="text-7xl text-center mb-16 font-bold text-slate-500">
        shopix
      </p>

      {/* search bar with search button */}
      <SearchWithIcon
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
        placeholder="paste product url"
      />
    </div>
  );
};

export default Home;
