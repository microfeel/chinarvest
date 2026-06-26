import { getAllProducts, getAllCategories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our complete catalog of premium Chinese agricultural products for wholesale export. Rice, grains, oats, beans, and more.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const allProducts = getAllProducts();
  const categories = getAllCategories();
  const params = await searchParams;
  const activeCategory = params?.category;

  const products = activeCategory
    ? allProducts.filter((p) => p.category === activeCategory)
    : allProducts;

  const categoryName =
    categories.find((c) => c.id === activeCategory)?.name || "All Products";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{categoryName}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {categoryName}
      </h1>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/products"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.id}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.name} ({cat.count})
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No products in this category yet.</p>
          <p className="mt-2">Check back soon as we expand our catalog.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
