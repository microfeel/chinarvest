import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ChinaRvest connects global buyers with premium Chinese agricultural products. Learn about our mission, sourcing standards, and export capability.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">About</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        About ChinaRvest
      </h1>

      <div className="prose max-w-none text-gray-600 space-y-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          ChinaRvest is a B2B export platform specializing in premium Chinese
          agricultural products. We bridge the gap between China&apos;s finest
          growing regions and global buyers seeking quality, certified
          agricultural products at wholesale prices.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10">
          Our Approach
        </h2>
        <p>
          We believe the traditional export model is broken — buyers rely on
          fragmented information, middlemen, and guesswork. We use trade data
          intelligence to identify the right markets for each product,
          AI-powered content to reach the right buyers, and rigorous background
          verification to ensure every transaction is with a legitimate partner.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-10">
          Our Product Range
        </h2>
        <p>
          We source from China&apos;s premier agricultural regions:
        </p>
        <ul>
          <li>
            <strong>Heilongjiang</strong> — Wuchang rice, organic millet, fresh
            corn, soybeans
          </li>
          <li>
            <strong>Inner Mongolia</strong> — Oats, oat products, low-GI cereals
          </li>
          <li>
            <strong>Shandong</strong> — Peanuts, processed agricultural products
          </li>
          <li>
            <strong>Guangxi</strong> — Preserved eggs, specialty products
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-10">
          Why Work With Us?
        </h2>
        <ul>
          <li>
            <strong>Verified Supply Chain</strong> — Direct relationships with
            certified producers
          </li>
          <li>
            <strong>Export Documentation</strong> — Full paperwork for customs
            clearance
          </li>
          <li>
            <strong>Quality Assurance</strong> — Organic, ISO, and other
            certifications available
          </li>
          <li>
            <strong>Flexible Shipping</strong> — FCL, LCL, or express delivery
          </li>
        </ul>
      </div>
    </div>
  );
}
