export type CategoryKey =
  | "iphone"
  | "android"
  | "ipad"
  | "tablets"
  | "laptops"
  | "audio"
  | "accessories";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface ProductVariant {
  id: string;
  storage?: string;
  color: string;
  colorHex?: string;
  connectivity?: string;
  price: number; // GNF
}

export interface SpecEntry {
  label: string;
  value: string;
}

export interface Product {
  id: string; // slug, used in /product/[slug]
  name: string;
  brand: string;
  category: CategoryKey;
  tagline: string;
  description: string;
  images: string[];
  colors: ColorOption[];
  storageOptions?: string[];
  connectivityOptions?: string[];
  variants: ProductVariant[];
  basePrice: number;
  specifications: SpecEntry[];
  whatsIncluded: string[];
  featured?: boolean;
  badge?: "Nouveau" | "Populaire" | null;
  stock: number;
  rating: number;
  reviews: number;
}

export interface CategoryInfo {
  key: CategoryKey;
  label: string;
  path: string;
  description: string;
  image: string;
  parent: "Smartphones" | "Tablettes" | "Ordinateurs" | "Audio" | "Accessoires";
}
