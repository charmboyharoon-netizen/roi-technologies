import type { Metadata } from "next";
import { getProductsByCategory } from "@/data/products";
import { getCategoryInfo } from "@/data/categories";
import CategoryPageClient from "@/components/CategoryPageClient";

export const metadata: Metadata = { title: "Audio — ROI Technology" };

export default function AudioPage() {
  const category = getCategoryInfo("audio")!;
  const products = getProductsByCategory("audio");
  return <CategoryPageClient category={category} products={products} />;
}
