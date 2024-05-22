import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar/navbar";

import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle/theme-toggle";

const poppins = Poppins({
  weight: ["400", "700"], // Specify the weights you need
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins", // Using a CSS variable for the font
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
