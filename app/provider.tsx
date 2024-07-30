"use client";

import ThemeWrapper from "@/lib/ThemeWrapper";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeWrapper>{children}</ThemeWrapper>
    </SessionProvider>
  );
};
