import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-baseline gap-1.5 ${className}`} aria-label="ROI Technology — Accueil">
      <span className="text-[1.35rem] font-extrabold tracking-tight text-neutral-950">
        ROI<span className="text-blue-600">.</span>
      </span>
      <span className="hidden text-[0.68rem] font-medium uppercase tracking-[0.16em] text-neutral-500 sm:inline">
        Technology
      </span>
    </Link>
  );
}
