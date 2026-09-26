"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Minus, MessageCircle, Plus, Star, Truck } from "lucide-react";
import type { Product, ProductVariant } from "@/data/types";
import { formatGNF } from "@/lib/currency";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { buildWhatsAppLink, productWhatsAppMessage } from "@/lib/whatsapp";
import ProductVariantSelector from "./ProductVariantSelector";

export default function ProductDetails({ product }: { product: Product }) {
  const [variant, setVariant] = useState<ProductVariant>(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState<"description" | "specs" | "included" | "delivery">("description");

  const { addItem } = useCart();
  const { notify } = useToast();

  const whatsappHref = useMemo(
    () =>
      buildWhatsAppLink(
        productWhatsAppMessage({
          productName: product.name,
          storage: variant.storage,
          color: variant.color,
          price: formatGNF(variant.price),
        }),
      ),
    [product.name, variant],
  );

  const handleAddToCart = () => {
    addItem(
      {
        key: `${product.id}::${variant.id}`,
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        storage: variant.storage,
        color: variant.color,
        price: variant.price,
      },
      qty,
    );
    notify(`${product.name} ajouté au panier`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div>
          <motion.div
            key={activeImage}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square w-full overflow-hidden rounded-3xl bg-neutral-50"
          >
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            {product.badge && (
              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                  product.badge === "Nouveau" ? "bg-blue-600 text-white" : "bg-neutral-900 text-white"
                }`}
              >
                {product.badge}
              </span>
            )}
          </motion.div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-16 w-16 overflow-hidden rounded-xl bg-neutral-50 ring-2 transition-all ${
                    activeImage === i ? "ring-blue-600" : "ring-transparent"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">{product.brand}</p>
          <h1 className="mt-1 text-2xl font-semibold text-neutral-950 sm:text-3xl">{product.name}</h1>
          <p className="mt-1.5 text-[0.95rem] text-neutral-500">{product.tagline}</p>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-sm text-neutral-500">
              {product.rating} ({product.reviews} avis)
            </span>
          </div>

          <p className="mt-5 text-3xl font-semibold text-neutral-950">{formatGNF(variant.price)}</p>

          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-neutral-600">{product.description}</p>

          <div className="mt-7 flex flex-col gap-6">
            <ProductVariantSelector product={product} onVariantChange={setVariant} />

            <div>
              <p className="mb-2.5 text-sm font-medium text-neutral-900">Quantité</p>
              <div className="flex w-fit items-center rounded-full border border-neutral-200">
                <button
                  type="button"
                  aria-label="Diminuer la quantité"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center text-neutral-600 hover:text-blue-600"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button
                  type="button"
                  aria-label="Augmenter la quantité"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center text-neutral-600 hover:text-blue-600"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Ajouter au panier
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <MessageCircle className="h-4 w-4" />
              Commander via WhatsApp
            </a>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-xs text-neutral-400">
            <Truck className="h-3.5 w-3.5" />
            {product.stock > 0 ? `En stock — livraison à Conakry sous 24-48h` : "Actuellement en rupture de stock"}
          </p>

          {/* Tabs */}
          <div className="mt-10 border-t border-neutral-100 pt-6">
            <div className="flex flex-wrap gap-1 border-b border-neutral-100">
              {(
                [
                  ["description", "Description"],
                  ["specs", "Caractéristiques"],
                  ["included", "Contenu de la boîte"],
                  ["delivery", "Livraison"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    tab === key ? "border-b-2 border-blue-600 text-neutral-950" : "text-neutral-400 hover:text-neutral-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="py-5 text-sm leading-relaxed text-neutral-600">
              {tab === "description" && <p>{product.description}</p>}
              {tab === "specs" && (
                <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {product.specifications.map((spec) => (
                    <div key={spec.label} className="flex justify-between border-b border-neutral-50 pb-2 sm:block sm:border-none">
                      <dt className="text-neutral-400">{spec.label}</dt>
                      <dd className="font-medium text-neutral-800">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === "included" && (
                <ul className="list-inside list-disc space-y-1.5">
                  {product.whatsIncluded.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {tab === "delivery" && (
                <p>
                  Livraison disponible à Conakry sous 24 à 48h. Pour les autres villes de Guinée, contactez-nous sur
                  WhatsApp pour connaître les délais et frais de livraison.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
