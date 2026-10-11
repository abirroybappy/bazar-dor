import "server-only";
import { cache } from "react";
export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: { dir: string; pct: number };
  markets: { market: string; division: string; min: number; max: number }[];
};
export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};
const base =
  process.env.BAZAR_API_URL || "https://api.abcz.workers.dev/api/bazardor";
async function api<T>(path: string): Promise<T | null> {
  const response = await fetch(`${base}${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (response.status === 404) return null;
  if (!response.ok)
    throw new Error("বাজারের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
  return response.json();
}
export const getProducts = cache(async (category?: string) => {
  return (
    (await api<Product[]>(
      `/products${category ? `?category=${encodeURIComponent(category)}` : ""}`,
    )) || []
  );
});
export async function getCategories() {
  return (await api<Category[]>("/categories")) || [];
}
export async function getCategory(slug: string) {
  const list = await getCategories();
  return list.find((c) => c.slug === slug) || null;
}
export async function getProduct(slug: string) {
  const products = await getProducts();
  const found = products.find((p) => p.slug === slug || String(p.id) === slug);
  return found ? api<Product>(`/products/${found.id}`) : null;
}
export const unitName = (unit: string) =>
  ({
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    l: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pc: "পিস",
  })[unit] || unit;
