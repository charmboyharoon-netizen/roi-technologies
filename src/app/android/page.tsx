import type { Metadata } from "next";
import { getProductsByCategory } from "@/data/products";
import { getCategoryInfo } from "@/data/categories";
import CategoryPageClient from "@/components/CategoryPageClient";

export const metadata: Metadata = { title: "Android — ROI Technology" };

export default function AndroidPage() {
  const category = getCategoryInfo("android")!;
  const products = getProductsByCategory("android");
  return <CategoryPageClient category={category} products={products} />;
}
