import type { Metadata } from "next";
import siteConfig from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ChinaRvest for wholesale inquiries, product information, and partnership opportunities.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-12">
        Interested in our products? Send us an inquiry and we&apos;ll get back
        to you within 24 hours.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Send an Inquiry
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              <strong>Email:</strong>
              <br />
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-green-600 hover:text-green-700"
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="text-gray-600 text-sm">
              Please include your company name, country, products of interest,
              and estimated quantity. This helps us respond with the most
              relevant pricing and product information.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What to Include
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">→</span>
              <span>Company name and country of operation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">→</span>
              <span>Products you are interested in</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">→</span>
              <span>Estimated monthly quantity / container size</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">→</span>
              <span>Any specific certification requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">→</span>
              <span>Preferred shipping port / delivery terms</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
