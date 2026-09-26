"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid grid-cols-1 overflow-hidden rounded-3xl bg-neutral-950 lg:grid-cols-2"
      >
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16">
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-blue-400">ROI Technology</p>
          <h2 className="max-w-md text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Upgrade your everyday technology.
          </h2>
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-neutral-400">
            Smartphones, tablettes, ordinateurs et accessoires — tout se trouve au même endroit.
          </p>
          <Link
            href="/iphone"
            className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200"
          >
            Explore products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative min-h-[240px]">
          <Image src="/images/promo-banner.jpg" alt="Sélection ROI Technology" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
      </motion.div>
    </section>
  );
}
