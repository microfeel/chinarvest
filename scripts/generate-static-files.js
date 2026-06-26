#!/usr/bin/env node
/**
 * Prebuild script: generates sitemap.xml and robots.txt
 * Runs before `next build` to ensure static export has all files.
 */
const fs = require("fs");
const path = require("path");

// Products are in ../../data/products/
const dataDir = path.join(__dirname, "..", "..", "data", "products");
const publicDir = path.join(__dirname, "..", "public");

const BASE_URL = "https://chinarvest.com";

// Read products
const products = [];
if (fs.existsSync(dataDir)) {
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
  for (const f of files) {
    try {
      const p = JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf-8"));
      products.push(p);
    } catch {}
  }
}

// Categories
const cats = {};
for (const p of products) {
  cats[p.category] = (cats[p.category] || 0) + 1;
}

// Generate sitemap
const pages = [
  { url: "", priority: "1.0", freq: "weekly" },
  { url: "/products", priority: "0.9", freq: "weekly" },
  { url: "/about", priority: "0.7", freq: "monthly" },
  { url: "/contact", priority: "0.5", freq: "monthly" },
];

for (const p of products) {
  pages.push({
    url: `/products/${p.category}/${p.slug}`,
    priority: "0.8",
    freq: "monthly",
  });
}

const urls = pages
  .map(
    (p) => `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
console.log(`✓ sitemap.xml generated (${pages.length} pages)`);

// Also ensure robots.txt exists
const robotsPath = path.join(publicDir, "robots.txt");
if (!fs.existsSync(robotsPath)) {
  fs.writeFileSync(
    robotsPath,
    `User-agent: *
Allow: /

User-agent: GPTBot
User-agent: Google-Extended
User-agent: ClaudeBot
User-agent: CCBot
Allow: /products/
Allow: /about/
Disallow: /contact

Sitemap: ${BASE_URL}/sitemap.xml
`
  );
  console.log("✓ robots.txt created");
}
