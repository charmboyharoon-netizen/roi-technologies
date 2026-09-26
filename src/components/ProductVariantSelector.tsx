"use client";

import { useEffect, useState } from "react";
import type { Product, ProductVariant } from "@/data/types";
import { findVariant } from "@/data/helpers";
import ColorSelector from "./ColorSelector";
import StorageSelector from "./StorageSelector";

/**
 * Reusable variant picker: renders storage + color controls for a product and
 * reports the resolved variant (and its price) back to the parent whenever
 * the selection changes.
 */
export default function ProductVariantSelector({
  product,
  onVariantChange,
}: {
  product: Product;
  onVariantChange: (variant: ProductVariant) => void;
}) {
  const [storage, setStorage] = useState<string | undefined>(product.storageOptions?.[0]);
  const [color, setColor] = useState<string>(product.colors[0]?.name ?? product.variants[0].color);

  useEffect(() => {
    onVariantChange(findVariant(product.variants, storage, color));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storage, color]);

  return (
    <div className="flex flex-col gap-6">
      {product.colors.length > 0 && <ColorSelector colors={product.colors} selected={color} onSelect={setColor} />}
      {product.storageOptions && product.storageOptions.length > 0 && (
        <StorageSelector options={product.storageOptions} selected={storage ?? ""} onSelect={setStorage} />
      )}
    </div>
  );
}
