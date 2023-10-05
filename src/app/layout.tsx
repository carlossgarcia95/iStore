import Navbar from "@/src/components/nav/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import { Toaster } from "../components/ui/Toaster";
import { CartContext } from "../hooks/useCart";
import CartProvider from "../providers/CartProvider";
import Providers from "../components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iStore",
  description: "Apple products e-commerce store ",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CartProvider>
            <div className="flex flex-col min-h-screen bg-slate-50">
              <Navbar />
              {authModal}
              <main className="flex-grow">{children}</main>
              <Footer />
              <Toaster />
            </div>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
