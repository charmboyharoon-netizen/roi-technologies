"use client";

import { useMemo, useState } from "react";
import type { CategoryInfo, Product } from "@/data/types";
import { applyFilters, emptyFilterState, getAvailableBrands, getAvailableColors, getAvailableStorages, sortProducts, type FilterState, type SortOption } from "@/lib/filters";
import CategoryHeader from "./CategoryHeader";
import FilterSidebar from "./FilterSidebar";
import FilterDrawer from "./FilterDrawer";
import ProductGrid from "./ProductGrid";

export default function CategoryPageClient({ category, products }: { category: CategoryInfo; products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("relevance");
  const [filters, setFilters] = useState<FilterState>(emptyFilterState);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const brands = useMemo(() => getAvailableBrands(products), [products]);
  const colors = useMemo(() => getAvailableColors(products), [products]);
  const storages = useMemo(() => getAvailableStorages(products), [products]);

  const visible = useMemo(() => sortProducts(applyFilters(products, filters), sort), [products, filters, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <CategoryHeader
        category={category}
        count={visible.length}
        sort={sort}
        onSortChange={setSort}
        onOpenFilters={() => setFiltersOpen(true)}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <FilterSidebar brands={brands} colors={colors} storages={storages} value={filters} onChange={setFilters} />
        </aside>

        <ProductGrid products={visible} emptyMessage="Aucun produit ne correspond à ces filtres." />
      </div>

      <FilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        brands={brands}
        colors={colors}
        storages={storages}
        value={filters}
        onChange={setFilters}
      />
    </div>
  );
}
