import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "ar" }];
}

export const metadata: Metadata = {
  title: "Services — OEM, Custom Packaging & Export Solutions",
  description: "ChinaRvest offers OEM manufacturing, private label packaging, custom certification compliance, and full export documentation services.",
};

const sections = {
  en: {
    title: "Our Services",
    subtitle: "Beyond product supply — we help you bring your vision to market.",
    oem: {
      title: "OEM / Private Label Manufacturing",
      desc: "We partner with certified manufacturers across China who offer OEM and private label services. Your brand, your specifications, our production capability. This includes custom formulation for food products, custom sizing and weight specifications, and quality control aligned with your market's standards.",
    },
    packaging: {
      title: "Custom Packaging Solutions",
      desc: "We offer flexible packaging options to suit your market requirements: retail-ready packaging with your brand design in any language, bulk packaging for wholesale distribution, and vacuum-sealed or modified atmosphere packaging for extended shelf life. Minimum order quantities for custom packaging are negotiable based on the product type.",
    },
    certification: {
      title: "Certification & Compliance Support",
      desc: "Navigating import regulations can be complex. We help you identify and prepare for the certifications your target market requires. Our suppliers already hold Organic, ISO 22000, Low GI, and Geographical Indication certifications. We can assist with documentation for HALAL, EU Organic Equivalency, FDA registration, and other market-specific requirements.",
    },
    export: {
      title: "Export & Logistics Services",
      desc: "From factory to port, we manage the entire export process: complete export documentation (commercial invoice, packing list, bill of lading, certificate of origin), insurance coverage, customs clearance coordination, and flexible shipping arrangements — FCL, LCL, or express delivery.",
    },
    sample: {
      title: "Sample Service",
      desc: "For verified buyers, we offer a sample shipment service. Samples can be sent via international express (DHL/FedEx) to confirm product quality before committing to a full order. Sample costs and shipping fees are discussed based on your specific requirements and order potential.",
    },
    inquiry: "Interested in any of these services? Contact us to discuss your specific needs.",
    cta: "Get in Touch →",
  },
  id: {
    title: "Layanan Kami",
    subtitle: "Lebih dari sekadar pasokan produk — kami membantu Anda mewujudkan visi Anda ke pasar.",
    oem: {
      title: "Manufaktur OEM / Label Pribadi",
      desc: "Kami bermitra dengan produsen bersertifikat di seluruh China yang menawarkan layanan OEM dan label pribadi. Merek Anda, spesifikasi Anda, kemampuan produksi kami. Termasuk formulasi kustom untuk produk makanan, spesifikasi ukuran dan berat kustom, serta kontrol kualitas yang sesuai dengan standar pasar Anda.",
    },
    packaging: {
      title: "Solusi Kemasan Kustom",
      desc: "Kami menawarkan opsi kemasan fleksibel yang sesuai dengan kebutuhan pasar Anda: kemasan siap ecer dengan desain merek Anda dalam bahasa apa pun, kemasan curah untuk distribusi grosir, dan kemasan vakum untuk memperpanjang umur simpan. Jumlah pesanan minimum untuk kemasan kustom dapat dinegosiasikan.",
    },
    certification: {
      title: "Dukungan Sertifikasi & Kepatuhan",
      desc: "Pemasok kami sudah memiliki sertifikasi Organik, ISO 22000, GI Rendah, dan Indikasi Geografis. Kami dapat membantu dengan dokumentasi untuk HALAL, Kesetaraan Organik UE, pendaftaran FDA, dan persyaratan khusus pasar lainnya.",
    },
    export: {
      title: "Layanan Ekspor & Logistik",
      desc: "Dari pabrik ke pelabuhan, kami mengelola seluruh proses ekspor: dokumentasi ekspor lengkap, perlindungan asuransi, koordinasi bea cukai, dan pengaturan pengiriman yang fleksibel — FCL, LCL, atau pengiriman ekspres.",
    },
    sample: {
      title: "Layanan Sampel",
      desc: "Untuk pembeli terverifikasi, kami menawarkan layanan pengiriman sampel melalui ekspres internasional (DHL/FedEx) untuk mengonfirmasi kualitas produk sebelum memesan dalam jumlah penuh.",
    },
    inquiry: "Tertarik dengan layanan ini? Hubungi kami untuk mendiskusikan kebutuhan spesifik Anda.",
    cta: "Hubungi Kami →",
  },
  ar: {
    title: "خدماتنا",
    subtitle: "أكثر من مجرد توريد المنتجات — نساعدك في تحقيق رؤيتك في السوق.",
    oem: {
      title: "التصنيع وفق العلامة التجارية / العلامة الخاصة",
      desc: "نحن نتعاون مع مصنعين معتمدين في جميع أنحاء الصين يقدمون خدمات التصنيع وفق العلامة التجارية والعلامة الخاصة. علامتك التجارية، مواصفاتك، قدراتنا الإنتاجية. يشمل ذلك التركيبة المخصصة للمنتجات الغذائية، وتحديد الأحجام والأوزان المخصصة، ومراقبة الجودة المتوافقة مع معايير السوق الخاص بك.",
    },
    packaging: {
      title: "حلول التعبئة والتغليف المخصصة",
      desc: "نقدم خيارات تغليف مرنة تناسب متطلبات السوق الخاص بك: تغليف جاهز للبيع بالتجزئة بتصميم علامتك التجارية بأي لغة، تغليف بالجملة للتوزيع، وتغليف مفرغ الهواء لإطالة فترة الصلاحية.",
    },
    certification: {
      title: "دعم الشهادات والامتثال",
      desc: "موردونا يحملون بالفعل شهادات العضوية، ISO 22000، انخفاض المؤشر الجلايسيمي، والمؤشر الجغرافي. يمكننا المساعدة في توثيق شهادات HALAL، ومعادلة العضوية للاتحاد الأوروبي، والتسجيل لدى FDA، ومتطلبات السوق الأخرى.",
    },
    export: {
      title: "خدمات التصدير والخدمات اللوجستية",
      desc: "من المصنع إلى الميناء، ندير عملية التصدير بأكملها: وثائق التصدير الكاملة، التغطية التأمينية، تنسيق التخليص الجمركي، وترتيبات الشحن المرنة — حاوية كاملة أو جزئية أو شحن سريع.",
    },
    sample: {
      title: "خدمة العينات",
      desc: "للمشترين الموثقين، نقدم خدمة شحن العينات عبر الشحن السريع الدولي (DHL/FedEx) لتأكيد جودة المنتج قبل الالتزام بطلب كامل.",
    },
    inquiry: "مهتم بهذه الخدمات؟ اتصل بنا لمناقشة احتياجاتك المحددة.",
    cta: "اتصل بنا ←",
  },
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const s = (sections as any)[locale] || sections.en;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-green-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{locale === "id" ? "Layanan" : locale === "ar" ? "خدمات" : "Services"}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{s.title}</h1>
      <p className="text-gray-600 mb-12">{s.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {["oem", "packaging", "certification", "export", "sample"].map((key) => {
          const item = s[key];
          const icons: Record<string, string> = {
            oem: "🏭",
            packaging: "📦",
            certification: "✅",
            export: "🚢",
            sample: "🔬",
          };
          return (
            <div key={key} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-green-300 transition-all">
              <div className="text-3xl mb-3">{icons[key]}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center bg-green-50 border border-green-200 rounded-xl p-8">
        <p className="text-gray-700 mb-4">{s.inquiry}</p>
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
        >
          {s.cta}
        </Link>
      </div>
    </div>
  );
}
