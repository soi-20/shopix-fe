// ThemeWrapper.tsx

"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isThemeEnabled, setIsThemeEnabled] = useState(true);

  useEffect(() => {
    if (pathname.startsWith("/insta")) {
      setIsThemeEnabled(false);
      document.documentElement.removeAttribute("class");
    } else {
      setIsThemeEnabled(true);
    }
  }, [pathname]);

  return isThemeEnabled ? (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  ) : (
    <>{children}</>
  );
};

export default ThemeWrapper;
