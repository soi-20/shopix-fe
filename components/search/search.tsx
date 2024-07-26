"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SearchIcon from "../icons/search-icon";
import { cn, isValidUrl } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchSchema } from "@/lib/validation";
import { Form, FormField, FormMessage } from "../ui/form";
import { useTheme } from "next-themes";
import { useSearchStore } from "@/store/searchResults";
import { Loader } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Product {
  id?: string;
  delivery?: string;
  image: string;
  title: string;
  rating?: string | number; // Rating as a string in the format "x/y"
  price: string; // Price as a string with currency symbol
  logo: string; // Base64 encoded logo
  link: string;
  source?: string; // Site name
}
type SearchResults = Product[];

interface SearchWithIconProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  onFileChange?: (files: FileList | null) => void;
}

export const SearchWithIcon = ({
  value,
  onChange,
  placeholder,
  className,
  ...props
}: SearchWithIconProps) => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchFound: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const setResults = useSearchStore((state) => state.setResults);

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    console.log("reached");

    try {
      setIsLoading(true);

      if (!values.searchFound) {
        form.setError("searchFound", {
          type: "manual",
          message:
            "Please upload a file or paste an image URL in the text input!",
        });
        setIsLoading(false);
        return;
      }

      let searchQuery = values.searchFound;
      console.log(searchQuery);

      if (isValidUrl(searchQuery)) {
        const response = await fetch("/api/getSearchResult", {
          method: "POST",
          body: JSON.stringify({ searchFound: searchQuery }),
        });

        if (!response.ok) throw new Error("Status code: " + response.status);

        const data = await response.json();

        // Add unique IDs to each product
        const productsWithIds = data.results.map((product: Product) => ({
          ...product,
          id: uuidv4(),
        }));

        setResults(productsWithIds);

        // Add the results to the database
        await addProductsToDatabase(productsWithIds);

        setIsLoading(false);
        form.reset();
        console.log("new showing image input results on search page");
      } else {
        console.log(searchQuery);
        const response = await fetch("/api/getTextSearchResult", {
          method: "POST",
          body: JSON.stringify({ searchFound: searchQuery }),
        });

        if (!response.ok) throw new Error("Status code: " + response.status);

        const data = await response.json();

        // Add unique IDs to each product
        const productsWithIds = data.results.map((product: Product) => ({
          ...product,
          id: uuidv4(),
        }));

        setResults(productsWithIds);

        // Add the results to the database
        await addProductsToDatabase(productsWithIds);

        setIsLoading(false);
        form.reset();
        console.log("new showing text input results on search page");
      }
    } catch (error) {
      console.error("Search failed:", error);
      setIsLoading(false);
    }
  };

  const addProductsToDatabase = async (products: SearchResults) => {
    try {
      console.log("Adding products to database:", products);
      const response = await fetch("/api/postProductDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Products added successfully:", data);
      } else {
        console.error("Error adding products:", data.error);
      }
    } catch (error) {
      console.error("Error adding products:", error);
    }
  };

  const { theme, setTheme } = useTheme();
  const mode = theme === "dark";
  const toggleTheme = () => {
    setTheme(mode ? "light" : "dark");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col sm:flex-row items-center gap-4",
          className
        )}
      >
        <FormField
          control={form.control}
          name="searchFound"
          render={({ field }) => (
            <div>
              <div className="flex flex-row sm:flex-row items-center gap-4">
                <Input
                  className="w-full sm:w-[518px] placeholder:text-border dark:placeholder:text-stone-300 rounded-[46px] border-4"
                  placeholder={placeholder}
                  {...props}
                  {...field}
                />
                <Button
                  type="submit"
                  className={cn(
                    "rounded-full h-14 w-14 border-4 text-xl bg-white dark:bg-black hover:bg-white/70",
                    { "cursor-not-allowed opacity-50": isLoading }
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="h-5 w-5 animate-spin text-black dark:text-white" />
                  ) : (
                    <SearchIcon mode={mode} width={24} height={24} />
                  )}
                </Button>
              </div>

              <FormMessage className="mt-4 text-center" />
            </div>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchWithIcon;
