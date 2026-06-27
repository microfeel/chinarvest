import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "ar" }];
}

export default async function LocaleFaqPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-green-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">FAQ</span>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-yellow-800">
        <p className="font-semibold mb-2">🌐 This page is available in English</p>
        <p><Link href="/en/faq" className="text-green-600 hover:text-green-700 underline">View in English →</Link></p>
      </div>
      <div className="mt-8 text-center text-gray-500">More languages coming soon.</div>
    </div>
  );
}
