import { z } from "zod";

export const acceptMessagesSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be of at least 10 characters" })
    .max(300, { message: "Content must be no longer than 300 characters" }),
});
