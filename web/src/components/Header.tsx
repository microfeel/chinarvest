import Link from "next/link";
import siteConfig from "@/lib/site";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-700">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/products" className="hover:text-green-700 transition-colors">
              Products
            </Link>
            <Link href="/about" className="hover:text-green-700 transition-colors">
              About
            </Link>
            <Link href="/faq" className="hover:text-green-700 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-green-700 transition-colors">
              Contact
            </Link>
          </nav>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
