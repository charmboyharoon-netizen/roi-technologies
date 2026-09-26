import type { ColorOption, ProductVariant } from "./types";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface StorageTier {
  storage: string;
  price: number;
}

/** Cartesian product of storage tiers x colors. Color never changes price. */
export function tierVariants(tiers: StorageTier[], colors: ColorOption[]): ProductVariant[] {
  const palette = colors.length ? colors : [{ name: "Standard", hex: "#1f2937" }];
  const variants: ProductVariant[] = [];
  tiers.forEach((tier) => {
    palette.forEach((color) => {
      variants.push({
        id: `${slugify(tier.storage)}-${slugify(color.name)}`,
        storage: tier.storage,
        color: color.name,
        colorHex: color.hex,
        price: tier.price,
      });
    });
  });
  return variants;
}

/** Products with a single price but multiple color choices (audio, accessories). */
export function colorVariants(colors: ColorOption[], price: number): ProductVariant[] {
  if (!colors.length) {
    return [{ id: "standard", color: "Standard", price }];
  }
  return colors.map((color) => ({
    id: slugify(color.name),
    color: color.name,
    colorHex: color.hex,
    price,
  }));
}

export function minPrice(variants: ProductVariant[]): number {
  return Math.min(...variants.map((v) => v.price));
}

/** Find the variant matching a given storage + color combo, falling back gracefully. */
export function findVariant(
  variants: ProductVariant[],
  storage: string | undefined,
  color: string,
): ProductVariant {
  const exact = variants.find((v) => (storage ? v.storage === storage : true) && v.color === color);
  if (exact) return exact;
  const sameStorage = storage ? variants.find((v) => v.storage === storage) : undefined;
  if (sameStorage) return sameStorage;
  const sameColor = variants.find((v) => v.color === color);
  return sameColor ?? variants[0];
}
