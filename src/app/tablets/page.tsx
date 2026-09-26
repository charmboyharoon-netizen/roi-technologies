import type { Metadata } from "next";
import { getProductsByCategory } from "@/data/products";
import { getCategoryInfo } from "@/data/categories";
import CategoryPageClient from "@/components/CategoryPageClient";

export const metadata: Metadata = { title: "Tablettes Android — ROI Technology" };

export default function TabletsPage() {
  const category = getCategoryInfo("tablets")!;
  const products = getProductsByCategory("tablets");
  return <CategoryPageClient category={category} products={products} />;
}
