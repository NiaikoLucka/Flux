import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({quiet: true});

export default defineConfig({
  schema: ["./src/db/Transaction.schema.ts"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials:{
    url: process.env.DATABASE_URL!,
  },
});