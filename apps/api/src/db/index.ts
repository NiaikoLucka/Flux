import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

const result = dotenv.config();

console.log("dotenv result:", result);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});