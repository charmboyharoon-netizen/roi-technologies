import type { CategoryInfo } from "./types";

export const CATEGORIES: CategoryInfo[] = [
  {
    key: "iphone",
    label: "iPhone",
    path: "/iphone",
    description: "Explorez les derniers modèles d'iPhone et choisissez le stockage et la couleur qui vous correspondent.",
    image: "/images/category-iphone.jpg",
    parent: "Smartphones",
  },
  {
    key: "android",
    label: "Android",
    path: "/android",
    description: "Samsung, Google, Xiaomi et OnePlus : découvrez les meilleurs smartphones Android du moment.",
    image: "/images/category-android.jpg",
    parent: "Smartphones",
  },
  {
    key: "ipad",
    label: "iPad",
    path: "/ipad",
    description: "Une gamme complète d'iPad pour la créativité, le travail et le divertissement.",
    image: "/images/category-ipad.jpg",
    parent: "Tablettes",
  },
  {
    key: "tablets",
    label: "Tablettes Android",
    path: "/tablets",
    description: "Des tablettes Android performantes signées Samsung, Xiaomi et Lenovo.",
    image: "/images/category-tablet.jpg",
    parent: "Tablettes",
  },
  {
    key: "laptops",
    label: "Ordinateurs",
    path: "/laptops",
    description: "MacBook, Dell, HP, Lenovo et ASUS : des ordinateurs portables pour chaque besoin.",
    image: "/images/category-laptop.jpg",
    parent: "Ordinateurs",
  },
  {
    key: "audio",
    label: "Audio",
    path: "/audio",
    description: "Écouteurs et casques sans fil pour une expérience sonore immersive.",
    image: "/images/category-audio.jpg",
    parent: "Audio",
  },
  {
    key: "accessories",
    label: "Accessoires",
    path: "/accessories",
    description: "Chargeurs, câbles, batteries externes et coques pour protéger et alimenter vos appareils.",
    image: "/images/category-accessories.jpg",
    parent: "Accessoires",
  },
];

export const NAV_GROUPS: { label: string; items: CategoryInfo[] }[] = [
  { label: "Smartphones", items: CATEGORIES.filter((c) => c.parent === "Smartphones") },
  { label: "Tablettes", items: CATEGORIES.filter((c) => c.parent === "Tablettes") },
  { label: "Ordinateurs", items: CATEGORIES.filter((c) => c.parent === "Ordinateurs") },
  { label: "Audio", items: CATEGORIES.filter((c) => c.parent === "Audio") },
  { label: "Accessoires", items: CATEGORIES.filter((c) => c.parent === "Accessoires") },
];

export function getCategoryInfo(key: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.key === key);
}
