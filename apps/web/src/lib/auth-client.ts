import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // En developement en utiliser votre port ex: "http://localhost:5000"
  baseURL: import.meta.env.VITE_API_URL,
});
