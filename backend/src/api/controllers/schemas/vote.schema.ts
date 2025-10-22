
import { z } from "zod";

export const VoteSchema = z.object({
  name: z.string().trim().min(2, "name must have at least 2 characters"),
  // normaliza a mayúsculas y valida ISO-2
  country_code: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{2}$/, "country_code must be ISO-2")
    .transform((s) => s.toUpperCase()),
  // acepta "2" o 2, entero 1..3
  option: z.coerce.number().int().min(1).max(3)
});
