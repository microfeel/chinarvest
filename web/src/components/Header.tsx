import Link from "next/link";
import siteConfig, { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/site";

interface HeaderProps {
  currentLocale: string;
}

export default function Header({ currentLocale }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${currentLocale}`} className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-700">
              ChinaRvest
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href={`/${currentLocale}`} className="hover:text-green-700 transition-colors">
              Home
            </Link>
            <Link href={`/${currentLocale}/products`} className="hover:text-green-700 transition-colors">
              Products
            </Link>
            <Link href={`/${currentLocale}/about`} className="hover:text-green-700 transition-colors">
              About
            </Link>
            <Link href={`/${currentLocale}/faq`} className="hover:text-green-700 transition-colors">
              FAQ
            </Link>
            <Link href={`/${currentLocale}/contact`} className="hover:text-green-700 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="text-sm text-gray-500 hover:text-green-700 transition-colors flex items-center gap-1">
                <span>{LOCALE_LABELS[currentLocale as Locale] || "English"}</span>
                <span className="text-xs">▼</span>
              </button>
              <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[160px]">
                {LOCALES.map((l) => (
                  <Link
                    key={l}
                    href={`/${l}`}
                    className={`block px-4 py-2 text-sm hover:bg-green-50 first:rounded-t-lg last:rounded-b-lg ${
                      l === currentLocale ? "text-green-700 font-medium bg-green-50" : "text-gray-700"
                    }`}
                  >
                    {LOCALE_LABELS[l]}
                  </Link>
                ))}
              </div>
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
