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
import { useRouter } from "next/navigation";

import { useTheme } from "next-themes";
import { useSearchStore } from "@/store/searchResults";
import { Loader } from "lucide-react";

interface SearchProps {
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
}: SearchProps) => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchFound: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);
  const setResults = useSearchStore((state) => state.setResults);
  const router = useRouter();

  const pollTaskStatus = async (taskId: number) => {
    try {
      const response = await fetch(`/api/getSearchResult/${taskId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch task status");

      const data = await response.json();

      console.log("Polling=== ", data);
      if (data.status === "complete") {
        setResults(data.result.Results);
        setIsLoading(false);
        router.push(`/search`);
      } else {
        setTimeout(() => pollTaskStatus(taskId), 3000);
      }
    } catch (error) {
      console.error("Polling failed:", error);
      setIsLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof searchSchema>) {
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

      const response = await fetch("/api/getSearchResult", {
        method: "POST",
        body: JSON.stringify({ searchFound: searchQuery }),
      });

      if (!response.ok) throw new Error("Status code: " + response.status);

      const data = await response.json();
      setTaskId(data.task_id);
      pollTaskStatus(data.task_id);
    } catch (error) {
      console.error("Search failed:", error);
      setIsLoading(false);
    }
    console.log(values);
  }

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
