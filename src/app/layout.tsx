import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Alliance for Responsible Choices",
  description:
    "Evidence-based initiatives, partnerships, and resources for a healthier drinking culture.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-black`}>
        {/* Skip link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] rounded bg-black px-3 py-2 text-white"
        >
          Skip to content
        </a>

        <Header />

        <main id="main" role="main" className="min-h-[70vh]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
