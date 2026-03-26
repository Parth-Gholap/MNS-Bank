import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/global/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahanagar Nagrik Sahakari Bank - MNS Bank Bhopal",
  description: "Mahanagar Nagrik Sahakari Bank Ltd. Bhopal offers comprehensive banking services, loans, deposits, and digital banking solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navigation currentPath="/" locale="en" />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
