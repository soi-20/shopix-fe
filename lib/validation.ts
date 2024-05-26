import { z } from "zod";

export const searchSchema = z.object({
  searchFound: z
    .string()
    .min(1, { message: "Please enter your search query or upload an image!" }),
});

export type SearchSchema = z.infer<typeof searchSchema>;
