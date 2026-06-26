import Link from "next/link";
import { getAllProducts, getAllCategories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import siteConfig from "@/lib/site";

export default function HomePage() {
  const products = getAllProducts();
  const categories = getAllCategories();
  const featured = products.filter((p) => p.export.hasExportHistory);
  const verified = products.filter((p) => p.certifications.length > 0);

  return (
    <>
      {/* Schema.org JSON-LD — Organization (GEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ChinaRvest",
            url: "https://chinarvest.com",
            description: siteConfig.description,
            foundingLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "CN" } },
            offers: { "@type": "Offer", itemOffered: categories.map((c) => ({ "@type": "Product", category: c.name })) },
          }),
        }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Premium Chinese
              <span className="text-green-600"> Agricultural Products</span>
              <br />
              for Global Wholesale
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              {siteConfig.tagline}. Sourced from China&apos;s finest growing
              regions — Heilongjiang, Inner Mongolia, and beyond. Certified
              quality, reliable supply, export-ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
              >
                Browse Products →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:border-green-300 hover:text-green-700 transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Product Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products#${cat.id}`}
              className="group block p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-green-700">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{cat.count} products</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured — Export Verified */}
      {featured.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Export Verified Products
            </h2>
            <p className="text-gray-600 mb-8">
              Products with confirmed export history and complete documentation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          All Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Why Source from ChinaRvest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-3">🌾</div>
              <h3 className="font-semibold mb-2">Direct from Origin</h3>
              <p className="text-green-200 text-sm">
                Products sourced directly from China&apos;s premium agricultural
                regions — no middlemen.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-semibold mb-2">Quality Certified</h3>
              <p className="text-green-200 text-sm">
                Organic, ISO, GMPC, and other certifications available.
                Traceability guaranteed.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">🚢</div>
              <h3 className="font-semibold mb-2">Export Ready</h3>
              <p className="text-green-200 text-sm">
                Complete export documentation. Flexible shipping — FCL, LCL, or
                express.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
