import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),

    email: z.string().email("L'adresse email n'est pas valide."),

    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères."),

    confirmPassword: z
      .string()
      .min(1, "Veuillez confirmer votre mot de passe."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("L'adresse email n'est pas valide."),
  password: z.string().min(1, "Le mot de passe est obligatoire."),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
