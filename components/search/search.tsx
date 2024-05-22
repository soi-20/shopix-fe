"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SearchIcon from "../icons/search-icon";
import { cn } from "@/lib/utils";
import Dropzone from "../dropzone/dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchSchema } from "@/lib/validation";
import { Form, FormField, FormMessage } from "../ui/form";
import { uploadFiles } from "@/actions/uploadThing";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useSearchStore } from "@/store/searchResults";
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

interface SearchWithDropzoneProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  onFileChange?: (files: FileList | null) => void;
}

export const SearchWithDropzone = ({ placeholder, className, ...props }: SearchWithDropzoneProps) => {
  const setResults = useSearchStore((state) => state.setResults);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchFound: file ? "Image Added" : "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      console.log("Paste event detected");
      const items = event.clipboardData?.items;
      let urlFound = false;

      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith("image")) {
            console.log("Image found in clipboard");
            const blob = items[i].getAsFile();
            if (blob) {
              console.log("Blob obtained from clipboard", blob);
              setFile(blob);
              handleFileChange(blob);
              return;
            }
          } else if (items[i].type === "text/plain") {
            items[i].getAsString((text) => {
              if (isValidUrl(text)) {
                console.log("URL found in clipboard", text);
                form.setValue("searchFound", text);
                urlFound = true;
              }
            });
          }
        }
      }

      if (!urlFound) {
        console.log("No URL found in clipboard");
      }
    };

    const isValidUrl = (string: string) => {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [form]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      console.log("File set in state", file);
      setFile(file);
      form.setValue("searchFound", "Image Added");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue("searchFound", "");
      setPreview(null);
    }
  };

  async function onSubmit(values: z.infer<typeof searchSchema>) {
    try {
      if (file) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/uploadThing", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Status code: " + response.status);
        const data = await response.json();

        setResults(data);
        form.reset();
        router.push(`/search`);
        
      } else if (values.searchFound.trim() !== "") {
        setIsLoading(true);

        const response = await fetch('/api/getSearchResult', {
          method: 'POST',
          body: JSON.stringify({ text: values }),
        });

        if (!response.ok) throw new Error("Status code: " + response.status);
        const data = await response.json();

        setResults(data);
        form.reset();
        router.push(`/search`);
      } else {
        console.log("No file uploaded and no search query provided");
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col items-center gap-4 mx-6", className)}>
        <FormField
          control={form.control}
          name="searchFound"
          render={({ field }) => (
            <>
              <div className="w-full sm:w-[518px] mx-auto border-4 border-border rounded-2xl overflow-hidden">
                <Dropzone 
                  onFileChange={(files) => handleFileChange(files?.[0] || null)} 
                  preview={preview} 
                />
              </div>

              <Input
                className="w-full sm:w-[518px] placeholder:text-border text-primary rounded-[46px] border-4"
                placeholder={placeholder}
                {...props}
                {...field}
                readOnly={!!file}
              />

              <Button
                type="submit"
                className="text-gray-700 rounded-full h-14 w-36 text-xl bg-gray-200 hover:bg-gray-200/90"
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <p className="">search</p>
                )}
              </Button>

              <FormMessage className="mt-4 text-center" />
            </>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchWithDropzone;
