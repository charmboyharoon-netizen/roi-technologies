import type { Metadata } from "next";
import { getProductsByCategory } from "@/data/products";
import { getCategoryInfo } from "@/data/categories";
import CategoryPageClient from "@/components/CategoryPageClient";

export const metadata: Metadata = { title: "Ordinateurs — ROI Technology" };

export default function LaptopsPage() {
  const category = getCategoryInfo("laptops")!;
  const products = getProductsByCategory("laptops");
  return <CategoryPageClient category={category} products={products} />;
}
