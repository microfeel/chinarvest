const dev = process.env.NODE_ENV === "development";

export const LOCALES = ["en", "id", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
  ar: "العربية",
};

export const LOCALE_DIRS: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  id: "ltr",
  ar: "rtl",
};

const siteConfig = {
  name: "ChinaRvest",
  fullName: {
    en: "ChinaRvest — China Agricultural Products Supplier",
    id: "ChinaRvest — Pemasok Produk Pertanian China",
    ar: "ChinaRvest — مورد المنتجات الزراعية الصينية",
  } as Record<Locale, string>,
  tagline: {
    en: "Premium Chinese Agricultural Products for Global Wholesale",
    id: "Produk Pertanian China Premium untuk Grosir Global",
    ar: "منتجات زراعية صينية فاخرة للبيع بالجملة العالمية",
  } as Record<Locale, string>,
  description: {
    en: "ChinaRvest connects global buyers with premium Chinese agricultural products. Wholesale rice, grains, beans, oats, corn, and specialty foods direct from China's finest growing regions.",
    id: "ChinaRvest menghubungkan pembeli global dengan produk pertanian China premium. Grosir beras, biji-bijian, kacang-kacangan, oat, jagung, dan makanan khas langsung dari wilayah pertanian terbaik China.",
    ar: "ChinaRvest تربط المشترين العالميين بالمنتجات الزراعية الصينية الفاخرة. بيع بالجملة للأرز والحبوب والبقوليات والشوفان والذرة والأطعمة المتخصصة مباشرة من أفضل المناطق الزراعية في الصين.",
  } as Record<Locale, string>,
  url: dev ? "http://localhost:3000" : "https://chinarvest.com",
  email: "hello@chinarvest.com",
  salesEmail: "sales@chinarvest.com",
};

export default siteConfig;
