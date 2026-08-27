import { authClient } from "../lib/auth-client";
import type { SignInProps, SignUpProps } from "../types/auth.type";

export const authService = {
  signIn: async ({ email, password }: SignInProps) => {
    return authClient.signIn.email({ email, password });
  },

  signUp: async ({ name, email, password }: SignUpProps) => {
    return authClient.signUp.email({ name, email, password });
  },

  signOut: async () => {
    return authClient.signOut();
  },
};
