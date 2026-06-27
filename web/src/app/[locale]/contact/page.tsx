import type { Metadata } from "next";
import siteConfig from "@/lib/site";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "ar" }];
}

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ChinaRvest for wholesale inquiries.",
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-green-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{locale === "id" ? "Kontak" : locale === "ar" ? "اتصل بنا" : "Contact"}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {locale === "id" ? "Hubungi Kami" : locale === "ar" ? "اتصل بنا" : "Contact Us"}
      </h1>
      <p className="text-gray-600 mb-12">
        {locale === "id"
          ? "Tertarik dengan produk kami? Kirimkan pertanyaan dan kami akan menghubungi Anda dalam 24 jam."
          : locale === "ar"
          ? "مهتم بمنتجاتنا؟ أرسل استفسارنا وسنرد عليك خلال 24 ساعة."
          : "Interested in our products? Send us an inquiry and we'll get back to you within 24 hours."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {locale === "id" ? "Kirim Pertanyaan" : locale === "ar" ? "أرسل استفساراً" : "Send an Inquiry"}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              <strong>{locale === "id" ? "Pertanyaan Umum:" : locale === "ar" ? "استفسارات عامة:" : "General Inquiries:"}</strong><br />
              <a href={`mailto:${siteConfig.email}`} className="text-green-600 hover:text-green-700">{siteConfig.email}</a>
            </p>
            <p className="text-gray-600">
              <strong>{locale === "id" ? "Penjualan & Pesanan:" : locale === "ar" ? "المبيعات والطلبات:" : "Sales & Orders:"}</strong><br />
              <a href={`mailto:${siteConfig.salesEmail}`} className="text-green-600 hover:text-green-700">{siteConfig.salesEmail}</a>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {locale === "id" ? "Yang Perlu Disertakan" : locale === "ar" ? "ما يجب تضمينه" : "What to Include"}
          </h2>
          <ul className="space-y-3 text-gray-600">
            {[
              locale === "id" ? "Nama perusahaan dan negara operasi" : locale === "ar" ? "اسم الشركة وبلد التشغيل" : "Company name and country of operation",
              locale === "id" ? "Produk yang Anda minati" : locale === "ar" ? "المنتجات التي تهتم بها" : "Products you are interested in",
              locale === "id" ? "Perkiraan jumlah bulanan / ukuran kontainer" : locale === "ar" ? "الكمية الشهرية المقدرة / حجم الحاوية" : "Estimated monthly quantity / container size",
              locale === "id" ? "Persyaratan sertifikasi khusus" : locale === "ar" ? "متطلبات الشهادات الخاصة" : "Any specific certification requirements",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
