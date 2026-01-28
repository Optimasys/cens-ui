import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const madeTommy = localFont({
  src: [
    {
      path: "../public/fonts/MadeTommy-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/MadeTommy-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-made-tommy",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "CENS Universitas Indonesia",
  description: "The Biggest and Most Innovative Civil Engineering Series of Events Held by Universitas Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${madeTommy.variable} antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}