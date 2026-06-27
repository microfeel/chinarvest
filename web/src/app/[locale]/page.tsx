import Link from "next/link";
import { getAllProducts, getAllCategories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import siteConfig, { type Locale, LOCALE_DIRS } from "@/lib/site";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "ar" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: siteConfig.fullName[loc] || siteConfig.fullName.en,
    description: siteConfig.description[loc] || siteConfig.description.en,
  };
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const products = getAllProducts();
  const categories = getAllCategories();
  const featured = products.filter((p) => p.export.hasExportHistory);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ChinaRvest",
            url: siteConfig.url,
          }),
        }}
      />

      <section className="bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {loc === "id" ? "Produk Pertanian China Premium" :
               loc === "ar" ? "منتجات زراعية صينية فاخرة" :
               "Premium Chinese"}
              <span className="text-green-600">
                {loc === "id" ? " untuk Grosir Global" :
                 loc === "ar" ? " للبيع بالجملة العالمية" :
                 " Agricultural Products"}
              </span>
              <br />{loc === "en" && "for Global Wholesale"}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              {siteConfig.description[loc] || siteConfig.description.en}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
              >
                {loc === "id" ? "Lihat Produk →" : loc === "ar" ? "تصفح المنتجات ←" : "Browse Products →"}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:border-green-300 hover:text-green-700 transition-colors"
              >
                {loc === "id" ? "Dapatkan Penawaran" : loc === "ar" ? "احصل على عرض سعر" : "Get a Quote"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {loc === "id" ? "Kategori Produk" : loc === "ar" ? "فئات المنتجات" : "Product Categories"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/products#${cat.id}`}
              className="group block p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-green-700">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.count} {loc === "id" ? "produk" : loc === "ar" ? "منتجات" : "products"}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {loc === "id" ? "Produk Terverifikasi Ekspor" : loc === "ar" ? "منتجات موثقة التصدير" : "Export Verified Products"}
            </h2>
            <p className="text-gray-600 mb-8">
              {loc === "id" ? "Produk dengan riwayat ekspor terkonfirmasi." :
               loc === "ar" ? "منتجات بسجل تصدير موثق." :
               "Products with confirmed export history."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {loc === "id" ? "Semua Produk" : loc === "ar" ? "جميع المنتجات" : "All Products"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {loc === "id" ? "Mengapa Memilih ChinaRvest?" :
             loc === "ar" ? "لماذا تختار ChinaRvest؟" :
             "Why Source from ChinaRvest?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "🌾", title: loc === "id" ? "Langsung dari Sumber" : loc === "ar" ? "مباشرة من المصدر" : "Direct from Origin",
                desc: loc === "id" ? "Produk langsung dari wilayah pertanian premium China." :
                      loc === "ar" ? "منتجات مباشرة من أفضل المناطق الزراعية في الصين." :
                      "Sourced directly from China's premium agricultural regions." },
              { icon: "✅", title: "Quality Certified",
                desc: loc === "id" ? "Sertifikasi organik, ISO, dan lainnya tersedia." :
                      loc === "ar" ? "شهادات عضوية و ISO وغيرها متوفرة." :
                      "Organic, ISO, and other certifications available." },
              { icon: "🚢", title: loc === "id" ? "Siap Ekspor" : loc === "ar" ? "جاهز للتصدير" : "Export Ready",
                desc: loc === "id" ? "Dokumentasi ekspor lengkap. FCL, LCL, atau ekspres." :
                      loc === "ar" ? "وثائق تصدير كاملة. حاوية كاملة أو جزئية أو شحن سريع." :
                      "Complete export documentation. FCL, LCL, or express." },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-green-200 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
