import path from "path";
import fs from "fs";
import type { Product } from "./types";

const dataDir = path.join(process.cwd(), "..", "data", "products");

export function getAllProducts(): Product[] {
  if (!fs.existsSync(dataDir)) return [];
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => {
      try {
        const raw = fs.readFileSync(path.join(dataDir, f), "utf-8");
        return JSON.parse(raw) as Product;
      } catch {
        return null;
      }
    })
    .filter((p): p is Product => p !== null);
}

export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getAllCategories(): { id: string; name: string; count: number }[] {
  const products = getAllProducts();
  const map = new Map<string, number>();
  for (const p of products) {
    map.set(p.category, (map.get(p.category) || 0) + 1);
  }
  return Array.from(map.entries()).map(([id, count]) => ({
    id,
    name: CATEGORY_LABELS[id] || id,
    count,
  }));
}

const CATEGORY_LABELS: Record<string, string> = {
  rice: "Rice & Grains",
  corn: "Fresh Corn",
  oats: "Oats & Cereals",
  beans: "Beans & Pulses",
  meat: "Processed Meat",
  condiments: "Sauces & Condiments",
  forest: "Forest Products",
  eggs: "Eggs & Preserved Eggs",
};
