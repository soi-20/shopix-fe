"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

/**
 * @see https://docs.uploadthing.com/api-reference#uploadfiles
 */
export async function uploadFiles(fd: FormData) {
  const files = fd.getAll("file") as File[];
  console.log("got the file", files);

  try {
    const uploadedFiles = await utapi.uploadFiles(files);
    console.log("received data", uploadedFiles);
    return uploadedFiles;
  } catch (error) {
    console.error("Upload failed", error);
    throw error;
  }
}

/**
 * @see https://docs.uploadthing.com/api-reference#uploadfilesfromurl
 */
export async function uploadFromUrl(fd: FormData) {
  const url = fd.get("url") as string;
  
  try {
    const uploadedFile = await utapi.uploadFilesFromUrl(url);
    return uploadedFile.data;
  } catch (error) {
    console.error("Upload from URL failed", error);
    throw error;
  }
}