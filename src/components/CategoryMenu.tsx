import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NAV_GROUPS } from "@/data/categories";

export default function CategoryMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-6">
      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            {group.label}
          </p>
          <ul className="flex flex-col">
            {group.items.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.path}
                  onClick={onNavigate}
                  className="group flex items-center justify-between rounded-lg px-2 py-2.5 text-[0.95rem] font-medium text-neutral-800 transition-colors hover:bg-neutral-100 hover:text-blue-600"
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
