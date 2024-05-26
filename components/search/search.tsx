"use client";

import React from "react";
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

  function onSubmit(values: z.infer<typeof searchSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
                  className="w-full  sm:w-[518px] placeholder:text-border dark:placeholder:text-stone-300 rounded-[46px] border-4"
                  placeholder={placeholder}
                  {...props}
                  {...field}
                />
                <Button
                  type="submit"
                  className="rounded-full h-14 w-14 border-4 text-xl bg-white dark:bg-black hover:bg-white/70"
                >
                  <SearchIcon mode={mode} width={24} height={24} />
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
