"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { resetProgress } from "@/lib/progress";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-black">
      {/* Background image */}


      <div className="absolute inset-0">
        <Image
          src="/bg.png"
          alt=""
          fill
          priority
          className="object-cover object-[55%_35%]"
        />

        {/* Readability overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.70)_55%,rgba(0,0,0,0.88)_100%)]" />
        <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.75)]" />
        <div className="absolute -bottom-28 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-[#f7d7a3]/20 blur-3xl" />
      </div>

      {/* Content (safe padding) */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end px-5 pb-8 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.16, 0.8, 0.25, 1] }}
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-xl"
        >
          <span className="text-[12px] uppercase tracking-[0.24em] text-white/80">
            Weihnachten • Mission
          </span>
          <motion.span
            aria-hidden
            className="h-2 w-2 rounded-full bg-[#F7D7A3]"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 0.8, 0.25, 1] }}
          className="mt-4 text-[32px] text-amber-100 font-semibold leading-[1.05]"
        >
          Kleine Schnitzeljagd.
          <br />
          Großes Finale.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.55, ease: [0.16, 0.8, 0.25, 1] }}
          className="mt-3 max-w-[36ch] text-[15px] leading-[1.5] text-white/85"
        >
          Ich hab dir eine kleine Reihe aus Hinweisen gebaut. Du brauchst nur dein Handy –
          und deine Detektiv-Laune.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.22, duration: 0.6, ease: [0.16, 0.8, 0.25, 1] }}
          className="mt-6"
        >
          <Link href="/play" className="block">
            <motion.button
              whileTap={{ scale: 0.985 }}
              className="relative w-full overflow-hidden rounded-2xl px-5 py-4 font-semibold tracking-wide
                         bg-gradient-to-b from-[#F7D7A3] to-[#D29B4C] text-[#1A140C]
                         shadow-[0_18px_50px_rgba(210,155,76,0.25)] border border-black/10"
            >
              <motion.span
                aria-hidden
                className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/35 blur-xl"
                animate={{ x: ["-30%", "160%"] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
              />
              <span className="relative">ZUR SCHNITZELJAGD</span>
            </motion.button>
          </Link>

          <motion.p
            className="mt-3 text-center text-[12px] text-white/65"
            animate={{ opacity: [0.6, 0.95, 0.6] }}
            transition={{ duration: 3.2, repeat: Infinity }}
          >
            Keine Sorge: Ich war nett. Meistens.
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}
