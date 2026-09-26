import type { Product } from "@/data/types";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating";

export interface FilterState {
  brands: string[];
  colors: string[];
  storages: string[];
  inStockOnly: boolean;
}

export const emptyFilterState: FilterState = {
  brands: [],
  colors: [],
  storages: [],
  inStockOnly: false,
};

export function getAvailableBrands(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.brand))).sort();
}

export function getAvailableColors(products: Product[]): string[] {
  return Array.from(new Set(products.flatMap((p) => p.colors.map((c) => c.name)))).sort();
}

export function getAvailableStorages(products: Product[]): string[] {
  return Array.from(new Set(products.flatMap((p) => p.storageOptions ?? []))).sort();
}

export function applyFilters(products: Product[], filters: FilterState): Product[] {
  return products.filter((p) => {
    if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
    if (filters.colors.length > 0 && !p.colors.some((c) => filters.colors.includes(c.name))) return false;
    if (filters.storages.length > 0 && !(p.storageOptions ?? []).some((s) => filters.storages.includes(s))) {
      return false;
    }
    if (filters.inStockOnly && p.stock <= 0) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.basePrice - b.basePrice);
    case "price-desc":
      return copy.sort((a, b) => b.basePrice - a.basePrice);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy;
  }
}
