import { z } from "zod";

export const searchSchema = z.object({searchFound: z.string().min(1, { message: "Please enter your search query!" }),});

export type SearchSchema = z.infer<typeof searchSchema>;
