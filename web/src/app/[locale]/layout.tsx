import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LOCALE_DIRS, type Locale } from "@/lib/site";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = LOCALE_DIRS[locale as Locale] || "ltr";

  return (
    <div dir={dir}>
      <Header currentLocale={locale} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
