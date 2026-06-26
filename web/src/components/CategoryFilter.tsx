"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

interface Props {
  products: Product[];
  categories: { id: string; name: string; count: number }[];
}

export default function CategoryFilter({ products, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Read URL hash on mount for category pre-selection
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && categories.some((c) => c.id === hash)) {
      setActiveCategory(hash);
    }
  }, [categories]);

  const filtered = useMemo(
    () =>
      activeCategory
        ? products.filter((p) => p.category === activeCategory)
        : products,
    [products, activeCategory]
  );

  const heading = activeCategory
    ? categories.find((c) => c.id === activeCategory)?.name || "Products"
    : "All Products";

  return (
    <>
      <div className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-green-700">Home</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{heading}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">{heading}</h1>

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              window.location.hash = cat.id;
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No products in this category yet.</p>
          <p className="mt-2">Check back soon as we expand our catalog.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
