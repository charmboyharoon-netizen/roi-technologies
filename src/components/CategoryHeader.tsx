"use client";

import Link from "next/link";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import type { CategoryInfo } from "@/data/types";
import type { SortOption } from "@/lib/filters";

const SORT_LABELS: Record<SortOption, string> = {
  relevance: "Pertinence",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
  rating: "Mieux notés",
};

export default function CategoryHeader({
  category,
  count,
  sort,
  onSortChange,
  onOpenFilters,
}: {
  category: CategoryInfo;
  count: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenFilters: () => void;
}) {
  return (
    <div className="mb-8">
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-neutral-700">Accueil</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-neutral-600">{category.label}</span>
      </nav>

      <h1 className="text-2xl font-semibold text-neutral-950 sm:text-3xl">{category.label}</h1>
      <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-neutral-500">{category.description}</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-5">
        <p className="text-sm text-neutral-500">
          {count} produit{count > 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenFilters}
            className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-400 lg:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filtrer
          </button>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-neutral-700 outline-none hover:border-neutral-400"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
