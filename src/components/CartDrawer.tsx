"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatGNF } from "@/lib/currency";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-black/40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-100 px-5">
              <h2 className="text-[1.05rem] font-semibold text-neutral-950">
                Panier {items.length > 0 && <span className="text-neutral-400">({items.length})</span>}
              </h2>
              <button
                type="button"
                aria-label="Fermer le panier"
                onClick={closeCart}
                className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag className="h-10 w-10 text-neutral-300" />
                <p className="text-sm font-medium text-neutral-500">Votre panier est vide.</p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
                >
                  Continuer mes achats
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-5 py-4">
                  {items.map((item) => (
                    <li key={item.key} className="flex gap-3 border-b border-neutral-100 py-4 last:border-none">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-50">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <p className="truncate text-sm font-semibold text-neutral-900">{item.name}</p>
                          <p className="text-xs text-neutral-400">
                            {[item.storage, item.color].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-neutral-200">
                            <button
                              type="button"
                              aria-label="Diminuer la quantité"
                              onClick={() => updateQty(item.key, item.qty - 1)}
                              className="flex h-7 w-7 items-center justify-center text-neutral-600 hover:text-blue-600"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                            <button
                              type="button"
                              aria-label="Augmenter la quantité"
                              onClick={() => updateQty(item.key, item.qty + 1)}
                              className="flex h-7 w-7 items-center justify-center text-neutral-600 hover:text-blue-600"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-neutral-950">{formatGNF(item.price * item.qty)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label="Retirer l'article"
                        onClick={() => removeItem(item.key)}
                        className="h-fit shrink-0 rounded-full p-1.5 text-neutral-300 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="shrink-0 border-t border-neutral-100 px-5 py-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Sous-total</span>
                    <span className="text-base font-semibold text-neutral-950">{formatGNF(subtotal)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex w-full items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Passer la commande
                  </Link>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-2 flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
                  >
                    Continuer mes achats
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
