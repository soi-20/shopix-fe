"use client";

import { cn, isValidUrl } from "@/lib/utils";
import { Form, FormField, FormMessage } from "../ui/form";
import Dropzone from "../dropzone/dropzone";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { searchSchema } from "@/lib/validation";
import { useSearchStore } from "@/store/searchResults";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { uploadFiles } from "@/actions/uploadThing";

interface SearchWithDropzoneProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  onFileChange?: (files: FileList | null) => void;
}

export const SearchWithDropzone = ({
  placeholder,
  className,
  ...props
}: SearchWithDropzoneProps) => {
  const setResults = useSearchStore((state) => state.setResults);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchFound: "",
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
              if (text && (form.getValues().searchFound !== "Image Added")) {
                console.log("URL/Text found in clipboard", text);
                form.setValue("searchFound", text);
                urlFound = true;
              }
            });
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [form]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      form.setValue("searchFound", "Image Added");
    } else {
      setPreview(null);
      form.setValue("searchFound", "");
    }
  }, [file, form]);

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

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
        form.reset();
        router.push(`/search`);
      } else {
        setTimeout(() => pollTaskStatus(taskId), 3000);
      }
    } catch (error) {
      console.error("Polling failed:", error);
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    try {
      setIsLoading(true);

      if (!values.searchFound && !file) {
        form.setError("searchFound", {
          type: "manual",
          message:
            "Please upload a file or paste an image URL in the text input!",
        });
        setIsLoading(false);
        return;
      }

      let searchQuery = values.searchFound;

      if (file || isValidUrl(searchQuery)) {
        if(file){
          const formData = new FormData();
          formData.append("file", file);

          console.log(formData, file, "uploading image");

          const uploadedInputImage = await uploadFiles(formData);

          console.log(uploadedInputImage, "uploadedInputImage");

          searchQuery = uploadedInputImage?.[0].data?.url || searchQuery;
        }
        const response = await fetch("/api/getSearchResult", {
          method: "POST",
          body: JSON.stringify({ searchFound: searchQuery }),
        });
  
        if (!response.ok) throw new Error("Status code: " + response.status);
  
        const data = await response.json();
        setTaskId(data.task_id);
        pollTaskStatus(data.task_id);
      } else {
        console.log(searchQuery);
        const response = await fetch("/api/getTextSearchResult", {
          method: "POST",
          body: JSON.stringify({ searchFound: searchQuery }),
        });
  
        if (!response.ok) throw new Error("Status code: " + response.status);
  
        const data = await response.json();
        setResults(data.results);
        setIsLoading(false);
        form.reset();
        console.log("new showing text input results on search page");
        router.push(`/search`);
      }
     
    } catch (error) {
      console.error("Search failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col items-center gap-4 mx-6", className)}
      >
        <FormField
          control={form.control}
          name="searchFound"
          render={({ field }) => (
            <>

              <div className="w-full sm:w-[518px] mx-auto border-4 border-border rounded-2xl overflow-hidden">
                <Dropzone onFileChange={handleFileChange} preview={preview} />
              </div>

              <Input
                className="w-full sm:w-[518px] placeholder:text-border text-primary rounded-[46px] border-4"
                placeholder={placeholder}
                {...props}
                {...field}
                readOnly={!!file}
              />

              {form.formState.errors.searchFound && (
                <FormMessage className="mt-4 text-center">
                  {form.formState.errors.searchFound.message}
                </FormMessage>
              )}

              <Button
                type="submit"
                className={cn(
                  "text-gray-700 rounded-full h-14 w-36 text-xl bg-gray-200 hover:bg-gray-200/90",
                  { "cursor-not-allowed opacity-50": isLoading }
                )}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <p className="">search</p>
                )}
              </Button>
            </>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchWithDropzone;
