"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

const BrandSuggestions: React.FC = () => {
  const [brandName, setBrandName] = useState<string>("");
  const [brandUrl, setBrandUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleBrandNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrandName(e.target.value);
  };

  const handleBrandUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrandUrl(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/scrape-brand-suggestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ brandName, brandUrl }),
        }
      );

      if (response.ok) {
        alert("Scraping started successfully!");
      } else {
        alert("Failed to start scraping.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="text-xl font-semibold">Brand Name</label>
        <input
          type="text"
          placeholder="Enter Brand Name"
          value={brandName}
          onChange={handleBrandNameChange}
          className="p-3 border rounded-sm text-md border-gray-300"
        />

        <label className="text-xl font-semibold">Brand URL</label>
        <input
          type="text"
          placeholder="Enter Brand URL"
          value={brandUrl}
          onChange={handleBrandUrlChange}
          className="p-3 border rounded-sm text-md border-gray-300"
        />

        <button
          type="submit"
          className="bg-[#000] text-white py-2 rounded-lg hover:bg-[#888] md:w-[15%] mt-5 font-semibold w-[20%]"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BrandSuggestions;
