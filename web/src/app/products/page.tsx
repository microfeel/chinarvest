import { getAllProducts, getAllCategories } from "@/lib/data";
import CategoryFilter from "@/components/CategoryFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our complete catalog of premium Chinese agricultural products for wholesale export. Rice, grains, oats, beans, and more.",
};

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <CategoryFilter products={allProducts} categories={categories} />
    </div>
  );
}
