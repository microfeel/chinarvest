import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 flex flex-col">
        {children}
      </body>
    </html>
  );
}
