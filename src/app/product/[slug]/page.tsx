import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getProductsByCategory, PRODUCTS } from "@/data/products";
import ProductDetails from "@/components/ProductDetails";
import RelatedProducts from "@/components/RelatedProducts";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductById(slug);
  return { title: product ? `${product.name} — ROI Technology` : "Produit — ROI Technology" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductById(slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.category).filter((p) => p.id !== product.id);

  return (
    <>
      <ProductDetails product={product} />
      <RelatedProducts products={related} />
    </>
  );
}
