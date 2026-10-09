import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর, বিভিন্ন বাজারের দামের তুলনা এবং দৈনিক মূল্য পরিবর্তন জানুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${hindSiliguri.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <main className="flex-1 bg-[#f0f5f0]">
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}