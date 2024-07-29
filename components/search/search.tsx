"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SearchIcon from "../icons/search-icon";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchSchema } from "@/lib/validation";
import { Form, FormField, FormMessage } from "../ui/form";
import { useTheme } from "next-themes";
import { useSearchStore } from "@/store/searchResults";
import { Loader } from "lucide-react";
import { handleSearch, isValidUrl } from "@/utils/searchHandler";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const setResults = useSearchStore((state) => state.setResults);

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    if (!values.searchFound || !isValidUrl(values.searchFound)) {
      form.setError("searchFound", {
        type: "manual",
        message: "Please enter a valid URL!",
      });
      return;
    }

    const searchResponse = await handleSearch(
      values.searchFound,
      setResults,
      form.reset,
      setIsLoading
    );

    if (!searchResponse) {
      console.error("search failed due to unexpected reason: ", {
        searchFound: values.searchFound,
      });
      setIsLoading(false);
      return;
    }

    const { search_id, imgURL, results } = searchResponse;

    localStorage.setItem(`image_url_${search_id}`, imgURL ?? "");
    localStorage.setItem(
      `search_results_${search_id}`,
      JSON.stringify(results)
    );

    router.push(`/search/${search_id}`);
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
