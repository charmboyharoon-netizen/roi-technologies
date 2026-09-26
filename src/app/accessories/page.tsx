import type { Metadata } from "next";
import { getProductsByCategory } from "@/data/products";
import { getCategoryInfo } from "@/data/categories";
import CategoryPageClient from "@/components/CategoryPageClient";

export const metadata: Metadata = { title: "Accessoires — ROI Technology" };

export default function AccessoriesPage() {
  const category = getCategoryInfo("accessories")!;
  const products = getProductsByCategory("accessories");
  return <CategoryPageClient category={category} products={products} />;
}
