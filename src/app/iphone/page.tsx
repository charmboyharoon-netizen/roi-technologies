import type { Metadata } from "next";
import { getProductsByCategory } from "@/data/products";
import { getCategoryInfo } from "@/data/categories";
import CategoryPageClient from "@/components/CategoryPageClient";

export const metadata: Metadata = { title: "iPhone — ROI Technology" };

export default function IPhonePage() {
  const category = getCategoryInfo("iphone")!;
  const products = getProductsByCategory("iphone");
  return <CategoryPageClient category={category} products={products} />;
}
