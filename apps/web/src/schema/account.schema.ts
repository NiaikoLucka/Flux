import { z } from "zod";

export const createAccountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  type: z.enum(["BANK", "CASH", "MOBILE_MONEY"], {
    message: "Choisissez un type de compte accepter",
  }),
  initialBalance: z
    .number("Le solde initial doit être un nombre")
    .min(0, "Le solde initial ne peut être négatif"),
});

export type CreateAccountForm = z.infer<typeof createAccountSchema>

