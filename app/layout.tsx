import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartProvider";

const inter = Inter({ subsets: ["latin"] });

const skipLinkClass =
  "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-white";

export const metadata: Metadata = {
  title: {
    default: "SoleStore — Premium Sneakers",
    template: "%s | SoleStore",
  },
  description: "Curated sneakers from the best brands. Free shipping over $100.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <a href="#main" className={skipLinkClass}>Skip to content</a>

        <CartProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}