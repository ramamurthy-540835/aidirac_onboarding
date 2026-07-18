import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIDIRAC - Enterprise AI Intelligence Platform",
  description:
    "AIDIRAC subscription portal for enterprise AI intelligence, multi-model access, agentic workflows, governance, and security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-white text-slate-950">{children}</body>
    </html>
  );
}
