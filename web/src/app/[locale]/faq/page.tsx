import type { Metadata } from "next";
import Link from "next/link";
import siteConfig from "@/lib/site";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "ar" }];
}

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "FAQ about importing premium Chinese agricultural products.",
};

const faqs_en = [
  { q: "What types of agricultural products does ChinaRvest supply?", a: "ChinaRvest supplies a wide range of premium Chinese agricultural products including Wuchang rice, organic millet, low GI oatmeal, blanched peanuts, beans, fresh corn, and specialty foods." },
  { q: "What is the minimum order quantity (MOQ)?", a: "MOQ varies by product. For most rice and grain products, the MOQ starts at 200-500 bags (5kg each). For peanuts and bulk commodities, the MOQ is typically 1×20' FCL." },
  { q: "What certifications do your products have?", a: "Our products carry various certifications including Organic, Geographical Indication (Wuchang rice), Low GI Certification, and Eagle Mark quality certification." },
  { q: "Do you provide export documentation?", a: "Yes. We provide complete export documentation including commercial invoice, packing list, bill of lading, phytosanitary certificate, certificate of origin, and insurance policy." },
  { q: "What shipping options are available?", a: "We offer FCL (full container load), LCL (less than container load), and express delivery options via sea or air freight." },
];

const faqs_id = [
  { q: "Produk pertanian apa saja yang dipasok ChinaRvest?", a: "ChinaRvest memasok berbagai produk pertanian China premium termasuk beras Wuchang, jawawut organik, oatmeal GI rendah, kacang tanah blanched, kacang-kacangan, jagung segar, dan makanan khas." },
  { q: "Berapa jumlah pesanan minimum (MOQ)?", a: "MOQ bervariasi menurut produk. Untuk sebagian besar beras dan biji-bijian, MOQ mulai dari 200-500 kantong (5kg). Untuk kacang tanah dan komoditas curah, MOQ biasanya 1×20' FCL." },
  { q: "Sertifikasi apa yang dimiliki produk Anda?", a: "Produk kami memiliki berbagai sertifikasi termasuk Organik, Indikasi Geografis (beras Wuchang), Sertifikasi GI Rendah, dan sertifikasi kualitas Eagle Mark." },
  { q: "Apakah Anda menyediakan dokumentasi ekspor?", a: "Ya. Kami menyediakan dokumentasi ekspor lengkap termasuk faktur komersial, packing list, bill of lading, sertifikat fitosanitasi, sertifikat asal, dan polis asuransi." },
  { q: "Opsi pengiriman apa yang tersedia?", a: "Kami menawarkan FCL (full container load), LCL (less than container load), dan opsi pengiriman ekspres melalui laut atau udara." },
];

const faqs_ar = [
  { q: "ما أنواع المنتجات الزراعية التي توفرها ChinaRvest؟", a: "توفر ChinaRvest مجموعة واسعة من المنتجات الزراعية الصينية الفاخرة بما في ذلك أرز ووتشانغ والدخن العضوي والشوفان منخفض المؤشر الجلايسيمي والفول السوداني المقشر والبقوليات والذرة الطازجة والأطعمة المتخصصة." },
  { q: "ما هي كمية الطلب الأدنى (MOQ)؟", a: "تختلف MOQ حسب المنتج. لمعظم منتجات الأرز والحبوب، تبدأ MOQ من 200-500 كيس (5 كجم). للفول السوداني والسلع السائبة، MOQ عادة 1×20' حاوية كاملة." },
  { q: "ما هي الشهادات التي تحملها منتجاتكم؟", a: "تحمل منتجاتنا شهادات متنوعة بما في ذلك العضوية، المؤشر الجغرافي (أرز ووتشانغ)، شهادة انخفاض المؤشر الجلايسيمي، وشهادة الجودة Eagle Mark." },
  { q: "هل توفرون وثائق التصدير؟", a: "نعم. نوفر وثائق تصدير كاملة تشمل الفاتورة التجارية، قائمة التعبئة، بوليصة الشحن، شهادة الصحة النباتية، شهادة المنشأ، ووثيقة التأمين." },
  { q: "ما خيارات الشحن المتاحة؟", a: "نوفر حاوية كاملة (FCL)، حاوية جزئية (LCL)، وخيارات الشحن السريع عبر البحر أو الجو." },
];

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  const faqs = locale === "id" ? faqs_id : locale === "ar" ? faqs_ar : faqs_en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-green-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{locale === "id" ? "FAQ" : locale === "ar" ? "الأسئلة الشائعة" : "FAQ"}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {locale === "id" ? "Pertanyaan yang Sering Diajukan" : locale === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
      </h1>
      <p className="text-gray-600 mb-12">
        {locale === "id" ? "Pertanyaan umum tentang impor produk pertanian China premium." : locale === "ar" ? "أسئلة شائعة حول استيراد المنتجات الزراعية الصينية الفاخرة." : "Common questions about importing premium Chinese agricultural products."}
      </p>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
            <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors list-none flex items-center justify-between">
              <span>{faq.q}</span>
              <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-6 py-4 border-t border-gray-100 text-gray-600 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(f => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}
