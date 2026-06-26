import Link from "next/link";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const en = product.i18n.en;
  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group block border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-green-300 transition-all"
    >
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={product.images.hero}
          alt={en.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {product.origin}
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
          {en.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {en.shortDescription}
        </p>
        {product.export.hasExportHistory && (
          <div className="mt-2 inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
            ✓ Export Verified
          </div>
        )}
        {product.certifications.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.certifications.map((cert) => (
              <span
                key={cert}
                className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full"
              >
                {cert}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
