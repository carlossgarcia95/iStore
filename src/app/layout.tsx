import Navbar from "@/src/components/nav/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import { Toaster } from "../components/ui/Toaster";

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
        <div className="flex flex-col min-h-screen bg-slate-100">
          <Navbar />
          {authModal}
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
