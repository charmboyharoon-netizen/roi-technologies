"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import Logo from "./Logo";
import CategoryMenu from "./CategoryMenu";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl lg:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-neutral-100 px-5">
              <Logo />
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={onClose}
                className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <div className="mb-6 flex flex-col gap-0.5 border-b border-neutral-100 pb-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="rounded-lg px-2 py-2.5 text-[1.02rem] font-semibold text-neutral-900 hover:bg-neutral-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <CategoryMenu onNavigate={onClose} />
            </div>

            <div className="border-t border-neutral-100 px-5 py-5 text-sm text-neutral-500">
              Conakry, Guinée · <a href="tel:+224620000000" className="text-blue-600 hover:underline">+224 620 00 00 00</a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
