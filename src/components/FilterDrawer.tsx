"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { FilterState } from "@/lib/filters";
import FilterSidebar from "./FilterSidebar";

export default function FilterDrawer({
  open,
  onClose,
  brands,
  colors,
  storages,
  value,
  onChange,
}: {
  open: boolean;
  onClose: () => void;
  brands: string[];
  colors: string[];
  storages: string[];
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          />
          <motion.aside
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl lg:hidden"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-neutral-950">Filtrer</h2>
              <button
                type="button"
                aria-label="Fermer les filtres"
                onClick={onClose}
                className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterSidebar brands={brands} colors={colors} storages={storages} value={value} onChange={onChange} />
            <button
              type="button"
              onClick={onClose}
              className="mt-7 w-full rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Voir les résultats
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
