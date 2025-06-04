import { z } from "zod";

export const orderSchema = z.object({
  code: z
    .string()
    .min(1, "Code is required")
    .regex(
      /^[A-Z0-9]+$/,
      "Code must contain only uppercase letters and numbers"
    ),
  name: z.string().min(1, "Name is required").max(100, "Name is too long")
});

export type OrderFormData = z.infer<typeof orderSchema>;
