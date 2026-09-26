"use client";

import { CATEGORIES } from "@/data/categories";
import AccordionGallery, { type AccordionGalleryItem } from "./reactbits/AccordionGallery";

export default function CategoryShowcase() {
  const items: AccordionGalleryItem[] = CATEGORIES.map((cat) => ({
    image: cat.image,
    label: cat.label,
    link: cat.path,
  }));

  return (
    <section className="bg-neutral-950 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-xl font-semibold text-white sm:text-2xl">Explorez nos univers</h2>
        <p className="mb-8 text-sm text-neutral-400">Survolez une catégorie pour la découvrir.</p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AccordionGallery
          items={items}
          defaultIndex={0}
          height={380}
          expandRatio={0.42}
          accentColor="#3B82F6"
          overlayColor="#050505"
          trigger="hover"
          grayscale
          showLabels
        />
      </div>
    </section>
  );
}
