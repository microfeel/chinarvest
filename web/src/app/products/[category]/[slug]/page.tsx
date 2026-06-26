import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getProductsByCategory, getAllProducts } from "@/lib/data";
import type { Metadata } from "next";
import siteConfig from "@/lib/site";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

// Required for static export — tells Next.js which paths to pre-render
export function generateStaticParams() {
  return getAllProducts().map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Product Not Found" };
  const en = p.i18n.en;
  return {
    title: en.name,
    description: en.shortDescription,
    openGraph: {
      title: `${en.name} | ${siteConfig.name}`,
      description: en.shortDescription,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const en = p.i18n.en;
  const sameCategory = getProductsByCategory(p.category).filter(
    (x) => x.id !== p.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-green-700">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 capitalize">{p.category}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{en.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={p.images.hero}
            alt={en.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
            {p.origin}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{en.name}</h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {p.export.hasExportHistory && (
              <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                ✓ Export Verified
              </span>
            )}
            {p.certifications.map((cert) => (
              <span key={cert} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                {cert}
              </span>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{en.description}</p>

          {/* Specs Table */}
          <div className="border rounded-xl overflow-hidden mb-8">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(p.specs).map(([key, val]) => (
                  <tr key={key} className="border-b last:border-0">
                    <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700 capitalize w-1/3">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{val}</td>
                  </tr>
                ))}
                <tr className="border-b last:border-0">
                  <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">MOQ</td>
                  <td className="px-4 py-3 text-gray-600">{p.pricing.moq}</td>
                </tr>
                <tr className="border-b last:border-0">
                  <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Origin</td>
                  <td className="px-4 py-3 text-gray-600">{p.origin}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <a
            href={`mailto:${siteConfig.email}?subject=Inquiry: ${encodeURIComponent(en.name)}`}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
          >
            Inquire About This Product →
          </a>
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: en.name,
            description: en.shortDescription,
            category: p.category,
            countryOfOrigin: { "@type": "Country", "name": "China" },
            manufacturer: {
              "@type": "Organization",
              name: p.supplier,
              ...(p.certifications.length > 0 && { certification: p.certifications }),
            },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              offeredBy: { "@type": "Organization", name: siteConfig.name },
            },
          }),
        }}
      />

      {/* Related Products */}
      {sameCategory.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-bold text-gray-900 mb-6">More in this Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sameCategory.slice(0, 3).map((rp) => {
              const ren = rp.i18n.en;
              return (
                <Link
                  key={rp.id}
                  href={`/products/${rp.category}/${rp.slug}`}
                  className="block p-4 border rounded-xl hover:border-green-300 transition-all"
                >
                  <h3 className="font-semibold text-gray-900 hover:text-green-700">{ren.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{ren.shortDescription}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
