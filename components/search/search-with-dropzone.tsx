"use client";

import { cn, isValidUrl } from "@/lib/utils";
import { Form, FormField, FormMessage } from "../ui/form";
import Dropzone from "../dropzone/dropzone";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Loader, Rotate3D, RotateCcw } from "lucide-react";
import { searchSchema } from "@/lib/validation";
import { useSearchStore } from "@/store/searchResults";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { uploadFiles } from "@/actions/uploadThing";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { canvasPreview } from "@/actions/cropImage";

interface SearchWithDropzoneProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
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
  const [submitPressed, setSubmitPressed] = useState(false);

  const [isCropInitialized, setIsCropInitialized] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [crop, setCrop] = useState<Crop>({
    unit: 'px', 
    x: 0,
    y: 0,
    width: width, 
    height: height, 
  });
  const [completedCrop, setCompletedCrop] = useState<Crop>({
    unit: 'px', 
    x: 0,
    y: 0,
    width: width, 
    height: height, 
  });
  const [scale, setScale] = useState(1);
  const refs = useRef(null);

  const onZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  const setTheFile = async () => {
    console.log("here's the scale", refs.current, completedCrop, scale, rotation)
    const blob = await canvasPreview(refs.current, completedCrop, scale, rotation);
    console.log(blob);
    if (blob instanceof Blob) {
      const file = new File([blob], "cropped_image.png", { type: "image/png" });
      setFile(file);
      setIsCropInitialized(false);
      console.log(file);
      setIsOverlayOpen(false);
    } 
    else {
      console.error("Failed to generate cropped image");
    }
  };

  const rotateRight=(e:any)=>{
    let newRotation = rotation + 90;
    if(newRotation >= 360) newRotation = -360;
    setRotation(newRotation);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const newHeight = e.currentTarget.height;
    const newWidth = e.currentTarget.width;
    setHeight(newHeight);
    setWidth(newWidth);
    
    if(!isCropInitialized){
      const fullCrop = {
        unit: 'px' as const,
        x: 10,
        y: 10,
        width: newWidth - 20,
        height: newHeight -20,
      };
      setCrop(fullCrop);
      setCompletedCrop(fullCrop);
      setIsCropInitialized(true);
    }
  };

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
    setIsOverlayOpen(true);
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
      } else {
        setTimeout(() => pollTaskStatus(taskId), 3000);
      }
    } catch (error) {
      console.error("Polling failed:", error);
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    setSubmitPressed(true);
    try {
      setIsLoading(true);
      setResults([]);
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
        if (file) {
          const formData = new FormData();
          formData.append("file", file);

          console.log(formData, file, "uploading image");

          const uploadedInputImage = await uploadFiles(formData);

          console.log(uploadedInputImage, "uploadedInputImage");

          searchQuery = uploadedInputImage?.[0].data?.url || searchQuery;
        }
        router.push(`/search`);
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
        router.push(`/search`);
        const response = await fetch("/api/getTextSearchResult", {
          method: "POST",
          body: JSON.stringify({ searchFound: searchQuery }),
        });

        if (!response.ok) throw new Error("Status code: " + response.status);

        const data = await response.json();
        setResults(data.results);
        setIsLoading(false);
        console.log("new showing text input results on search page");
      }

    } catch (error) {
      console.error("Search failed:", error);
      setIsLoading(false);
    }

    console.log("tried");
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

              <style jsx global>{`
                .ReactCrop__crop-selection {
                  border: solid;
                  border-radius: 24px;
                  background-repeat: no-repeat;
                }

                .ReactCrop__drag-handle {
                  width: 2px;
                  height: 2px;
                  background-color: white;
                  border: none;
                  border-radius: 100%;
                  box-shadow: 0 0 0px rgba(0, 0, 0, 0.7);
                }

                .ReactCrop__drag-handle::after {
                  display: none;
                }

                .ReactCrop__drag-bar {
                  display: none;
                }

                .ReactCrop .ord-nw,
                .ReactCrop .ord-ne,
                .ReactCrop .ord-sw,
                .ReactCrop .ord-se {
                  width: 20px;
                  height: 20px;
                }
              `}</style>

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

              {isOverlayOpen && file && (
                <div className="fixed inset-0 z-50 flex p-4 items-center justify-center bg-black bg-opacity-50">
                  <div className="relative flex items-center gap-4 justify-center flex-col bg-white p-4 rounded-lg max-w-full max-h-full overflow-auto">
                    <ReactCrop
                      crop={crop}
                      onChange={(newCrop) => setCrop(newCrop)}
                      onComplete={(c) => {
                        console.log(c);
                        if (c.height === 0 || c.width === 0) {
                          setCompletedCrop({
                            x: 0,
                            y: 0,
                            height: height,
                            width: width,
                            unit: 'px'
                          });
                        } else {
                          setCompletedCrop(c);
                        }
                      }}
                    >
                      <div className="">
                      <img ref={refs} className="max-h-[70vh]" style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }} src={URL.createObjectURL(file)} onLoad={onImageLoad} alt="Crop Preview" />
                      </div>
                    </ReactCrop>
                    <div className="flex flex-row gap-4 items-center justify-center mt-2">
                      <Check onClick={setTheFile} className="w-12 h-7 text-white bg-black rounded-full" />
                    </div>
                  </div>
                </div>
              )}

            </>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchWithDropzone;
