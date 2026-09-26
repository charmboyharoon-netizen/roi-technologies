import Link from "next/link";
import { MapPin } from "lucide-react";
import Logo from "./Logo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo />
            <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-neutral-500">
              Votre technologie, votre choix.
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm text-neutral-500">
              <MapPin className="h-4 w-4" />
              Conakry, Guinée
            </div>
          </div>

          <div>
            <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-neutral-400">
              Catégories
            </p>
            <ul className="flex flex-col gap-2 text-sm text-neutral-600">
              <li><Link href="/iphone" className="hover:text-blue-600">iPhone</Link></li>
              <li><Link href="/android" className="hover:text-blue-600">Android</Link></li>
              <li><Link href="/tablets" className="hover:text-blue-600">Tablettes</Link></li>
              <li><Link href="/laptops" className="hover:text-blue-600">Ordinateurs</Link></li>
              <li><Link href="/audio" className="hover:text-blue-600">Audio</Link></li>
              <li><Link href="/accessories" className="hover:text-blue-600">Accessoires</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-neutral-400">
              Service client
            </p>
            <ul className="flex flex-col gap-2 text-sm text-neutral-600">
              <li><Link href="/checkout" className="hover:text-blue-600">Contact</Link></li>
              <li>
                <a
                  href={buildWhatsAppLink("Bonjour ROI Technology, j'ai une question.")}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600"
                >
                  WhatsApp
                </a>
              </li>
              <li><span className="text-neutral-400">Livraison</span></li>
              <li><span className="text-neutral-400">FAQ</span></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-neutral-400">
              Suivez-nous
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-[0.68rem] font-bold text-neutral-600 hover:border-blue-600 hover:text-blue-600"
              >
                IG
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-[0.68rem] font-bold text-neutral-600 hover:border-blue-600 hover:text-blue-600"
              >
                FB
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-[0.68rem] font-bold text-neutral-600 hover:border-blue-600 hover:text-blue-600"
              >
                TT
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-100 pt-6 text-xs text-neutral-400">
          © 2026 ROI Technology. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
