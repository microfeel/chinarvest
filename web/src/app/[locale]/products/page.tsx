import Link from "next/link";
import { getAllProducts, getAllCategories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "ar" }];
}

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our complete catalog of premium Chinese agricultural products.",
};

export default async function LocaleProductsPage({ params }: Props) {
  const { locale } = await params;
  const allProducts = getAllProducts();
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-green-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">
          {locale === "id" ? "Semua Produk" : locale === "ar" ? "جميع المنتجات" : "All Products"}
        </span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {locale === "id" ? "Semua Produk" : locale === "ar" ? "جميع المنتجات" : "All Products"}
      </h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <span
            key={cat.id}
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600"
          >
            {cat.name} ({cat.count})
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts.map((p) => (
          <ProductCard key={p.id} product={p} locale={locale} />
        ))}
      </div>
    </div>
  );
}
