import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "ar" }];
}

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ChinaRvest connects global buyers with premium Chinese agricultural products.",
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-green-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">About</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {locale === "id" ? "Tentang ChinaRvest" : locale === "ar" ? "حول ChinaRvest" : "About ChinaRvest"}
      </h1>

      <div className="prose max-w-none text-gray-600 space-y-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          {locale === "id"
            ? "ChinaRvest adalah platform ekspor B2B yang mengkhususkan diri dalam produk pertanian China premium. Kami menjembatani kesenjangan antara wilayah pertanian terbaik China dan pembeli global yang mencari produk pertanian berkualitas dan bersertifikat dengan harga grosir."
            : locale === "ar"
            ? "ChinaRvest هي منصة تصدير B2B متخصصة في المنتجات الزراعية الصينية الفاخرة. نسد الفجوة بين أفضل المناطق الزراعية في الصين والمشترين العالميين الباحثين عن منتجات زراعية عالية الجودة ومعتمدة بأسعار الجملة."
            : "ChinaRvest is a B2B export platform specializing in premium Chinese agricultural products. We bridge the gap between China's finest growing regions and global buyers seeking quality, certified agricultural products at wholesale prices."}
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10">
          {locale === "id" ? "Pendekatan Kami" : locale === "ar" ? "نهجنا" : "Our Approach"}
        </h2>
        <p>
          {locale === "id"
            ? "Kami menggunakan intelijen data perdagangan untuk mengidentifikasi pasar yang tepat untuk setiap produk, konten bertenaga AI untuk menjangkau pembeli yang tepat, dan verifikasi latar belakang yang ketat untuk memastikan setiap transaksi dilakukan dengan mitra yang sah."
            : locale === "ar"
            ? "نستخدم ذكاء بيانات التجارة لتحديد الأسواق المناسبة لكل منتج، والمحتوى المدعوم بالذكاء الاصطناعي للوصول إلى المشترين المناسبين، والتحقق الدقيق من الخلفية لضمان أن كل معاملة تتم مع شريك شرعي."
            : "We believe the traditional export model is broken. We use trade data intelligence to identify the right markets for each product, AI-powered content to reach the right buyers, and rigorous background verification to ensure every transaction is with a legitimate partner."}
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10">
          {locale === "id" ? "Ragam Produk Kami" : locale === "ar" ? "مجموعة منتجاتنا" : "Our Product Range"}
        </h2>
        <p>
          {locale === "id"
            ? "Kami bersumber dari wilayah pertanian utama China:"
            : locale === "ar"
            ? "نحصل على منتجاتنا من أفضل المناطق الزراعية في الصين:"
            : "We source from China's premier agricultural regions:"}
        </p>
        <ul>
          <li><strong>Heilongjiang</strong> — {locale === "id" ? "Beras Wuchang, jawawut organik, jagung segar, kedelai" : locale === "ar" ? "أرز ووتشانغ، الدخن العضوي، الذرة الطازجة، فول الصويا" : "Wuchang rice, organic millet, fresh corn, soybeans"}</li>
          <li><strong>Inner Mongolia</strong> — {locale === "id" ? "Oat, produk oat, sereal GI rendah" : locale === "ar" ? "الشوفان، منتجات الشوفان، حبوب منخفضة المؤشر الجلايسيمي" : "Oats, oat products, low-GI cereals"}</li>
          <li><strong>Shandong</strong> — {locale === "id" ? "Kacang tanah, produk pertanian olahan" : locale === "ar" ? "الفول السوداني، المنتجات الزراعية المصنعة" : "Peanuts, processed agricultural products"}</li>
        </ul>
      </div>
    </div>
  );
}
