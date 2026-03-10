import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FinSuite - Maximize Your Financial Potential",
  description:
    "Comprehensive financial analytics dashboard and money management tool.",
};

import { CMSDataInitializer } from "@/components/CMSDataInitializer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CMSDataInitializer>{children}</CMSDataInitializer>
      </body>
    </html>
  );
}
