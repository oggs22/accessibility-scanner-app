import { z } from "zod";

export const scanValidationSchema = z.object({
  urls: z
    .array(z.string().url('Invalid URL format'))
    .min(1, "At least one valid URL is required")
    .max(10, "A maximum of 10 URLs can be scanned at once"),
});
