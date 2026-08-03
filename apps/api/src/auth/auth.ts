import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),

  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "http://localhost:5173", // TODO: Mettre a jour avec le lien du front 
  ],
});
