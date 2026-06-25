import AuthProvider from "@/providers/AuthProvider";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "নিরাময় | আপনার বিশ্বস্ত স্বাস্থ্যসেবা সঙ্গী",
    template: "%s | নিরাময়",
  },
  description:
    "নিরাময় — অনলাইনে অভিজ্ঞ ডাক্তারের সাথে অ্যাপয়েন্টমেন্ট বুক করুন। যেকোনো সময়, যেকোনো জায়গা থেকে স্বাস্থ্যসেবা।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="niramoy"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning>
       
        <AuthProvider>
         <Navbar />
          {children}
          <Footer />
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
