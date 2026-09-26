import type { ColorOption } from "@/data/types";

export default function ColorSelector({
  colors,
  selected,
  onSelect,
}: {
  colors: ColorOption[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  if (colors.length === 0) return null;

  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-neutral-900">
        Couleur <span className="font-normal text-neutral-400">— {selected}</span>
      </p>
      <div className="flex flex-wrap gap-2.5">
        {colors.map((color) => {
          const isActive = color.name === selected;
          return (
            <button
              key={color.name}
              type="button"
              onClick={() => onSelect(color.name)}
              title={color.name}
              aria-label={color.name}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                isActive ? "ring-2 ring-blue-600 ring-offset-2" : "ring-1 ring-neutral-200 hover:ring-neutral-300"
              }`}
            >
              <span className="h-6 w-6 rounded-full" style={{ backgroundColor: color.hex }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
