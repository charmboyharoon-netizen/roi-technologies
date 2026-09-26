export default function StorageSelector({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}) {
  if (options.length === 0) return null;

  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-neutral-900">Stockage</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option === selected;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`rounded-xl border px-3.5 py-2 text-[0.85rem] font-medium transition-colors ${
                isActive
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
