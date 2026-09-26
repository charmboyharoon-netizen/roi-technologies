"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, Search, ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "iPhone", href: "/iphone" },
  { label: "Android", href: "/android" },
  { label: "Tablettes", href: "/tablets" },
  { label: "iPad", href: "/ipad" },
  { label: "Ordinateurs", href: "/laptops" },
  { label: "Audio", href: "/audio" },
  { label: "Accessoires", href: "/accessories" },
];

export default function Navbar() {
  const { totalCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 ${
          scrolled ? "border-neutral-200 bg-white/90 backdrop-blur-md" : "border-transparent bg-white"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-[0.9rem] font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Rechercher"
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2.5 text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Panier"
              onClick={openCart}
              className="relative rounded-full p-2.5 text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-blue-600 px-1 text-[0.65rem] font-semibold text-white">
                  {totalCount}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Ouvrir le menu"
              onClick={() => setMenuOpen(true)}
              className="rounded-full p-2.5 text-neutral-700 transition-colors hover:bg-neutral-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
