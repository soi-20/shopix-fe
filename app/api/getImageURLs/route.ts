import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: "dpqttg5rg",
  api_key: "257229174518674",
  api_secret: "sz_CoGWWKRA_y0xxcZgWZMqZG00",
  secure: true,
});

type UploadResponse =
  | { success: true; result?: UploadApiResponse }
  | { success: false; error: UploadApiErrorResponse };

const uploadToCloudinary = (
  fileUri: string,
  fileName: string
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "Instagram",
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        console.error(error);
        resolve({ success: false, error });
      });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("image");
    console.log(files);

    const uploadPromises = files.map(async (file) => {
      if (file instanceof File) {
        const fileBuffer = await file.arrayBuffer();

        const mimeType = file.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");

        // this will be used to upload the file
        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
        console.log(fileUri);

        const result = await uploadToCloudinary(fileUri, file.name);

        if (result.success) {
          return result.result?.secure_url || null;
        } else {
          console.error("Upload failed:", result.error);
          return null;
        }
      }
    });

    const results = await Promise.all(uploadPromises);
    // convert results to a JSON object
    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
