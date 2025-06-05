import { z } from "zod";

export const termSchema = z.object({
  code: z.string().min(1, "Code is required"),
  startDate: z.string().optional(),
  endDate: z.string().min(1, "End date is required"),
  status: z.enum(["new", "in-progress", "completed"], {
    required_error: "Status is required"
  })
});

export type TermFormData = z.infer<typeof termSchema>;
