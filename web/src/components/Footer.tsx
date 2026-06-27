import Link from "next/link";
import siteConfig from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">ChinaRvest</h3>
            <p className="text-sm leading-relaxed">
              Premium Chinese Agricultural Products for Global Wholesale.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/en/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/en/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/en/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/en/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{" "}
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          &copy; {new Date().getFullYear()} ChinaRvest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
