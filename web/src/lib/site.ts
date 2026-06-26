const dev = process.env.NODE_ENV === "development";

const siteConfig = {
  name: "ChinaRvest",
  fullName: "ChinaRvest — China Agricultural Products Supplier",
  tagline: "Premium Chinese Agricultural Products for Global Wholesale",
  description:
    "ChinaRvest connects global buyers with premium Chinese agricultural products. Wholesale rice, grains, beans, oats, corn, and specialty foods direct from China's finest growing regions.",
  url: dev ? "http://localhost:3000" : "https://chinarvest.com",
  locale: "en_US",
  email: "hello@chinarvest.com",
  social: {
    whatsapp: "+86...",
  },
};

export default siteConfig;
