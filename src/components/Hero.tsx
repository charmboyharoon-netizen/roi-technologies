"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import BlurText from "./reactbits/BlurText";
import GradualBlur from "./reactbits/GradualBlur";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-blue-600"
          >
            Technologie • Conakry
          </motion.p>

          <BlurText
            text="Technology that fits your world."
            delay={90}
            animateBy="words"
            direction="top"
            className="text-[2.2rem] font-bold leading-[1.08] tracking-tight text-neutral-950 sm:text-[2.9rem] lg:text-[3.3rem]"
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-neutral-600"
          >
            Découvrez smartphones, tablettes, ordinateurs, audio et accessoires chez ROI Technology — la référence
            technologique à Conakry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/iphone"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Shop Smartphones
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/laptops"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-400"
            >
              Explore All Products
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl bg-white"
        >
          <Image
            src="/images/hero-devices.jpg"
            alt="Smartphones, tablette et écouteurs ROI Technology"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-cover"
          />
          <GradualBlur position="bottom" height="4rem" strength={1.5} opacity={0.9} target="parent" />
        </motion.div>
      </div>
    </section>
  );
}
