// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// This loads the "Inter" font for a clean, modern look.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeuroNLP Chat",
  description: "Conversational Brain Cognition Analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}