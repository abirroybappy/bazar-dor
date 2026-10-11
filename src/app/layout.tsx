import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/header";
import Ticker from "@/components/ticker";
import Providers from "@/components/providers";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "বাজার দর — আজকের বাজারের দাম", template: "%s | বাজার দর" },
  description:
    "চাল, ডাল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের বাজারভিত্তিক দাম এক নজরে।",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const date = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
  return (
    <html lang="bn">
      <body>
        <a className="skip-link" href="#main">
          মূল কনটেন্টে যান
        </a>
        <Header date={date} />
        <Suspense fallback={<div className="ticker skeleton" />}>
          <Ticker />
        </Suspense>
        <main id="main">{children}</main>
        <footer>
          <div className="container footer-content">
            <span>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
            <span>
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </span>
          </div>
        </footer>
        <Providers />
      </body>
    </html>
  );
}
