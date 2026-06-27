import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import siteConfig, { LOCALE_DIRS, type Locale } from "@/lib/site";

export const metadata: Metadata = {
  title: "ChinaRvest — China Agricultural Products Supplier",
  description: "ChinaRvest connects global buyers with premium Chinese agricultural products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-white text-gray-900 flex flex-col">
        <Header currentLocale="en" />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
