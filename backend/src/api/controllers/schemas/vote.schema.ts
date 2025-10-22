
import { z } from "zod";

export const VoteSchema = z.object({
  name: z.string().trim().min(2, "name must have at least 2 characters"),
  // normaliza a mayúsculas y valida ISO-2
  country_code: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{2}$/, "country_code must be ISO-2")
    .transform((s) => s.toUpperCase()),
  // acepta las etiquetas nuevas o números 1..3 (compatibilidad).
  // Normaliza siempre a la etiqueta string.
  option: z.union([
    z.enum(["Baby boy", "Baby girl", "Baby decides"]),
    z.coerce.number().int().min(1).max(3).transform(n => ({ 1: "Baby boy", 2: "Baby girl", 3: "Baby decides" }[n]))
  ])
});
