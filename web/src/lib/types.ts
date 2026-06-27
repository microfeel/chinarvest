export interface ProductI18n {
  name: string;
  description: string;
  shortDescription: string;
  keywords: string[];
}


export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  category: string;
  subCategory: string;
  brand: string;
  supplier: string;
  origin: string;
  certifications: string[];
  specs: Record<string, string>;
  export: {
    hasExportHistory: boolean;
    destinations: string[];
  };
  images: {
    hero: string;
    gallery: ProductImage[];
  };
  i18n: Record<string, ProductI18n>;
}

export interface ClientRecord {
  companyName: string;
  country: string;
  verified: boolean;
  tier: "tier1" | "tier2" | "tier3";
  importHistory: {
    hsCode: string;
    volume: string;
    supplier: string;
  }[];
  contactInfo: {
    whatsapp?: string;
    email?: string;
  };
  interactionLog: {
    date: string;
    type: string;
    detail: string;
  }[];
  sampleStatus?: string;
}
