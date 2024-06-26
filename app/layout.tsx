import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from "next/font/google";

import { ThemeProvider } from "next-themes";

const poppins = Poppins({
  weight: ["400", "700"], // Specify the weights you need
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins", // Using a CSS variable for the font
});

export const metadata: Metadata = {
  title: "shopix",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={poppins.variable} lang="en">
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* <ThemeToggle /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
