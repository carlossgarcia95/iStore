import Navbar from "@/src/components/nav/Navbar";
import type { Metadata } from "next";
import Footer from "../components/Footer";
import Providers from "../components/Provider";
import { Toaster } from "../components/ui/Toaster";
import { inter } from "../components/ui/fonts";
import CartProvider from "../providers/CartProvider";
import "./globals.css";
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
