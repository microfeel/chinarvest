import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getProductsByCategory, getAllProducts } from "@/lib/data";
import siteConfig, { type Locale } from "@/lib/site";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

export function generateStaticParams() {
  const products = getAllProducts();
  const params: { locale: string; category: string; slug: string }[] = [];
  for (const locale of ["en", "id", "ar"]) {
    for (const p of products) {
      params.push({ locale, category: p.category, slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Not Found" };
  const i18n = p.i18n[locale] || p.i18n.en;
  return {
    title: `${i18n.name} | ChinaRvest`,
    description: i18n.shortDescription,
  };
}

export default async function LocaleProductDetail({ params }: Props) {
  const { locale, slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const i18n = p.i18n[locale] || p.i18n.en;
  const sameCategory = getProductsByCategory(p.category).filter((x) => x.id !== p.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-green-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/${locale}/products`} className="hover:text-green-700">
          {locale === "id" ? "Produk" : locale === "ar" ? "المنتجات" : "Products"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 capitalize">{p.category}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{i18n.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
          <img src={p.images.hero} alt={i18n.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">{p.origin}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{i18n.name}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {p.export.hasExportHistory && (
              <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                ✓ {locale === "id" ? "Terverifikasi Ekspor" : locale === "ar" ? "موثق التصدير" : "Export Verified"}
              </span>
            )}
            {p.certifications.map((cert) => (
              <span key={cert} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                {cert}
              </span>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{i18n.description}</p>

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
                  <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">
                    {locale === "id" ? "Asal" : locale === "ar" ? "المنشأ" : "Origin"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.origin}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(locale === "id" ? "Permintaan: " : locale === "ar" ? "استفسار: " : "Inquiry: ")}${encodeURIComponent(i18n.name)}`}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
          >
            {locale === "id" ? "Tanya Tentang Produk Ini →" :
             locale === "ar" ? "استفسر عن هذا المنتج ←" :
             "Inquire About This Product →"}
          </a>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: i18n.name,
            description: i18n.shortDescription,
            category: p.category,
            countryOfOrigin: { "@type": "Country", "name": "China" },
            offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
          }),
        }}
      />

      {/* Related */}
      {sameCategory.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {locale === "id" ? "Produk Lain di Kategori Ini" :
             locale === "ar" ? "المزيد في هذه الفئة" :
             "More in this Category"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sameCategory.slice(0, 3).map((rp) => {
              const ren = rp.i18n[locale] || rp.i18n.en;
              return (
                <Link
                  key={rp.id}
                  href={`/${locale}/products/${rp.category}/${rp.slug}`}
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
