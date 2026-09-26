import Link from "next/link";
import FuzzyText from "@/components/reactbits/FuzzyText";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-white px-6 text-center">
      <FuzzyText fontSize="clamp(3rem, 14vw, 9rem)" color="#0a0a0a" baseIntensity={0.12} hoverIntensity={0.35}>
        404
      </FuzzyText>
      <div>
        <p className="text-lg font-semibold text-neutral-900">Cette page n&apos;existe pas.</p>
        <p className="mt-1 text-sm text-neutral-500">Le produit ou la page que vous cherchez a peut-être été déplacé.</p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
