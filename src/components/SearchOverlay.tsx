"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { searchProducts } from "@/data/products";
import { formatGNF } from "@/lib/currency";

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset search field when overlay closes
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => searchProducts(query).slice(0, 8), [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-20 sm:pt-28"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3.5">
              <Search className="h-5 w-5 shrink-0 text-neutral-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un iPhone, Samsung, AirPods, chargeur…"
                className="w-full border-none bg-transparent text-[0.95rem] text-neutral-900 outline-none placeholder:text-neutral-400"
              />
              <button
                type="button"
                aria-label="Fermer la recherche"
                onClick={onClose}
                className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim().length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-neutral-400">
                  Commencez à taper pour rechercher un produit.
                </div>
              ) : results.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-neutral-500">
                  Aucun résultat pour « {query} ».
                </div>
              ) : (
                <>
                  <p className="px-5 pt-3 text-xs text-neutral-400">
                    {searchProducts(query).length} résultat{searchProducts(query).length > 1 ? "s" : ""} pour « {query} »
                  </p>
                  <ul className="p-2">
                    {results.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/product/${product.id}`}
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-neutral-50"
                        >
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                            <Image src={product.images[0]} alt={product.name} fill sizes="48px" className="object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-neutral-900">{product.name}</p>
                            <p className="text-xs text-neutral-400">{product.brand}</p>
                          </div>
                          <p className="shrink-0 text-sm font-semibold text-neutral-900">
                            {formatGNF(product.basePrice)}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
