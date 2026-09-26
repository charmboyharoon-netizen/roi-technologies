import type { Product } from "@/data/types";
import { formatGNF } from "@/lib/currency";
import ChromaGrid, { type ChromaItem } from "./reactbits/ChromaGrid";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  const items: ChromaItem[] = products.slice(0, 6).map((p) => ({
    image: p.images[0],
    title: p.name,
    subtitle: formatGNF(p.basePrice),
    handle: p.brand,
    borderColor: "#2563EB",
    gradient: "linear-gradient(160deg, #111111, #000000)",
    url: `/product/${p.id}`,
  }));

  return (
    <section className="border-t border-neutral-100 bg-neutral-950 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-xl font-semibold text-white sm:text-2xl">Vous pourriez aussi aimer</h2>
        <p className="mb-8 text-sm text-neutral-400">D&apos;autres produits de la même catégorie.</p>
      </div>
      <div style={{ height: 420 }}>
        <ChromaGrid items={items} radius={280} columns={3} rows={2} />
      </div>
    </section>
  );
}
