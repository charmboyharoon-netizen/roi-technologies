import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import ProductGrid from "./ProductGrid";

export default function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 8);

  return (
    <section className="bg-neutral-50 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-950 sm:text-2xl">Technologie en vedette</h2>
            <p className="mt-1 text-sm text-neutral-500">Une sélection des produits les plus demandés.</p>
          </div>
          <Link
            href="/iphone"
            className="hidden items-center gap-1 text-sm font-medium text-blue-600 hover:underline sm:flex"
          >
            Voir tout <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
}
