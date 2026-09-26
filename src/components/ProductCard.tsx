"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import type { Product } from "@/data/types";
import { formatGNF } from "@/lib/currency";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { notify } = useToast();

  const defaultVariant = product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      key: `${product.id}::${defaultVariant.id}`,
      productId: product.id,
      variantId: defaultVariant.id,
      name: product.name,
      brand: product.brand,
      image: product.images[0],
      storage: defaultVariant.storage,
      color: defaultVariant.color,
      price: defaultVariant.price,
    });
    notify(`${product.name} ajouté au panier`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link
        href={`/product/${product.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-neutral-50">
          {product.badge && (
            <span
              className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide ${
                product.badge === "Nouveau" ? "bg-blue-600 text-white" : "bg-neutral-900 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label="Ajouter au panier"
            className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-900 opacity-0 shadow-md ring-1 ring-black/5 transition-all duration-200 group-hover:opacity-100 hover:bg-blue-600 hover:text-white"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 p-3.5 sm:p-4">
          <p className="text-[0.72rem] font-medium uppercase tracking-wide text-neutral-400">{product.brand}</p>
          <h3 className="text-[0.92rem] font-semibold leading-snug text-neutral-900 sm:text-[0.98rem]">
            {product.name}
          </h3>
          {product.colors.length > 0 && (
            <div className="mt-1 flex items-center gap-1">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.name}
                  className="h-3 w-3 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          )}
          <div className="mt-auto pt-2">
            <p className="text-[0.68rem] text-neutral-400">À partir de</p>
            <p className="text-[0.98rem] font-semibold text-neutral-950">{formatGNF(product.basePrice)}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
