"use server";

import { signIn } from "./authConfig";

export const handleGoogleSignIn = async () => {
  try {
    await signIn("google", { redirectTo: "/" });
  } catch (error) {
    throw error;
  }
};
