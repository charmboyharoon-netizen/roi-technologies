import type { Metadata } from "next";
import { getProductsByCategory } from "@/data/products";
import { getCategoryInfo } from "@/data/categories";
import CategoryPageClient from "@/components/CategoryPageClient";

export const metadata: Metadata = { title: "iPad — ROI Technology" };

export default function IPadPage() {
  const category = getCategoryInfo("ipad")!;
  const products = getProductsByCategory("ipad");
  return <CategoryPageClient category={category} products={products} />;
}
