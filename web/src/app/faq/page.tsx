import type { Metadata } from "next";
import siteConfig from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — China Agricultural Products Wholesale",
  description:
    "FAQ about importing premium Chinese agricultural products: rice, grains, oats, beans, and peanuts. MOQ, shipping, certifications, export documentation, and more.",
};

const faqs = [
  {
    question: "What types of agricultural products does ChinaRvest supply?",
    answer:
      "ChinaRvest supplies a wide range of premium Chinese agricultural products including Wuchang rice, organic millet, low GI oatmeal, blanched peanuts, beans, fresh corn, and specialty foods. We source directly from China's premier growing regions: Heilongjiang (rice, corn, soybeans), Inner Mongolia (oats, oat products), and Shandong (peanuts).",
  },
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "MOQ varies by product. For most rice and grain products, the MOQ starts at 200-500 bags (5kg each). For peanuts and bulk commodities, the MOQ is typically 1×20' FCL (full container load). We also offer LCL (less than container load) options for selected products. Contact us for product-specific MOQ details.",
  },
  {
    question: "What certifications do your products have?",
    answer:
      "Our products carry various certifications including Organic Certification (China Organic), Geographical Indication (for Wuchang rice), Low GI Certification (for YinShanYouMai oatmeal), and Eagle Mark quality certification. Many of our suppliers also hold ISO 22000 food safety management system certification.",
  },
  {
    question: "Do you provide export documentation?",
    answer:
      "Yes. We provide complete export documentation including commercial invoice, packing list, bill of lading, phytosanitary certificate, certificate of origin, and insurance policy (All Risks). Our shipment to Syria (2,800 cartons of blanched peanuts, Qingdao to Lattakia) demonstrates our full export capability.",
  },
  {
    question: "What shipping options are available?",
    answer:
      "We offer FCL (full container load), LCL (less than container load), and express delivery options. Shipping is available via sea freight from major Chinese ports (Qingdao, Shanghai, Tianjin) and air freight for urgent or smaller orders. We ship to most global destinations.",
  },
  {
    question: "What payment terms do you accept?",
    answer:
      "We accept T/T (telegraphic transfer), L/C (letter of credit), and negotiable terms for established business relationships. Payment terms are discussed on a per-order basis depending on order value and destination.",
  },
  {
    question: "Can I get product samples before placing a bulk order?",
    answer:
      "Yes. For verified buyers, we offer sample shipment services. Samples can be sent via international express (DHL/FedEx). The sample cost and shipping fee structure will be discussed based on your specific requirements.",
  },
  {
    question: "How long does shipping take from China to my country?",
    answer:
      "Shipping times vary by destination: Southeast Asia 5-10 days by sea, Middle East 12-20 days, Europe 20-30 days, Americas 25-35 days. Express delivery (DHL/FedEx) typically takes 5-10 working days worldwide.",
  },
  {
    question: "Do you offer OEM/private label services?",
    answer:
      "Yes. Many of our suppliers offer OEM and private label services. We can arrange custom packaging with your brand, language, and design requirements. Minimum quantities for OEM orders may differ from standard products.",
  },
  {
    question: "How can I verify your company and products?",
    answer:
      "We encourage buyers to conduct due diligence. You can verify our export history through customs records, request product testing from independent laboratories, schedule a factory visit (virtually or in person), or check our trade references. We are transparent about our supply chain and welcome all reasonable verification requests.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-green-700">Home</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">FAQ</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-600 mb-12">
        Common questions about importing premium Chinese agricultural products.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group border border-gray-200 rounded-xl overflow-hidden"
          >
            <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors list-none flex items-center justify-between">
              <span>{faq.question}</span>
              <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-6 py-4 border-t border-gray-100 text-gray-600 leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      {/* Schema.org JSON-LD — FAQPage (GEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
