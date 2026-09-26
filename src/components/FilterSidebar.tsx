import type { FilterState } from "@/lib/filters";

export default function FilterSidebar({
  brands,
  colors,
  storages,
  value,
  onChange,
}: {
  brands: string[];
  colors: string[];
  storages: string[];
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const toggle = (key: "brands" | "colors" | "storages", item: string) => {
    const current = value[key];
    const next = current.includes(item) ? current.filter((v) => v !== item) : [...current, item];
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="flex flex-col gap-7">
      {brands.length > 1 && (
        <div>
          <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-neutral-400">Marque</p>
          <div className="flex flex-col gap-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2.5 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={value.brands.includes(brand)}
                  onChange={() => toggle("brands", brand)}
                  className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      )}

      {storages.length > 0 && (
        <div>
          <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-neutral-400">Stockage</p>
          <div className="flex flex-col gap-2">
            {storages.map((storage) => (
              <label key={storage} className="flex items-center gap-2.5 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={value.storages.includes(storage)}
                  onChange={() => toggle("storages", storage)}
                  className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                />
                {storage}
              </label>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-neutral-400">Couleur</p>
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <label key={color} className="flex items-center gap-2.5 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={value.colors.includes(color)}
                  onChange={() => toggle("colors", color)}
                  className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                />
                {color}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="flex items-center gap-2.5 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={value.inStockOnly}
            onChange={() => onChange({ ...value, inStockOnly: !value.inStockOnly })}
            className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
          />
          En stock uniquement
        </label>
      </div>

      {(value.brands.length > 0 || value.colors.length > 0 || value.storages.length > 0 || value.inStockOnly) && (
        <button
          type="button"
          onClick={() => onChange({ brands: [], colors: [], storages: [], inStockOnly: false })}
          className="text-left text-sm font-medium text-blue-600 hover:underline"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
}
