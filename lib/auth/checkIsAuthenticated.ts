"use server";

import { auth } from "./authConfig";

export const checkIsAuthenticated = async () => {
  const session = await auth();
  const isAuthenticated = !!session;
  return { isAuthenticated, session };
};
