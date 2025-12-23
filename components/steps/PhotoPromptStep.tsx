"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { PhotoPromptStep as PhotoPromptStepType } from "@/lib/steps";
import { useState } from "react";
import { isAnswerCorrect } from "@/lib/answer";

export default function PhotoPromptStep({
  step,
  onNext,
}: {
  step: PhotoPromptStepType;
  onNext: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [tries, setTries] = useState(0);
  const [error, setError] = useState("");

  const check = () => {
    const ok = isAnswerCorrect(value, step.answers);
    if (ok) {
      setError("");
      setOpen(false);
      onNext();
      return;
    }
    setTries((t) => t + 1);
    setError("Noch nicht ganz – schau nochmal genau.");
  };

  return (
    <div className="min-h-[calc(100vh-0px)] w-full overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
      {/* TOP: Image (no overlay) */}
      <div className="relative h-[52vh] w-full">
        <Image
          src={step.imageSrc}
          alt="Hinweisbild"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* BOTTOM: Content */}
      <div className="relative px-5 pb-6 pt-5">
        <motion.h2
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease: [0.16, 0.8, 0.25, 1] }}
          className="text-[26px] font-semibold leading-[1.08] text-[#F7F3E8]"
        >
          {step.headline}
        </motion.h2>

        {step.subtext && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45 }}
            className="mt-3 max-w-[40ch] text-[15px] leading-[1.55] text-white/85"
          >
            {step.subtext}
          </motion.p>
        )}

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.14, duration: 0.5, ease: [0.16, 0.8, 0.25, 1] }}
          className="mt-6 space-y-3"
        >
          <motion.button
            whileTap={{ scale: 0.985 }}
            onClick={() => setOpen(true)}
            className="w-full rounded-2xl px-5 py-4 font-semibold tracking-wide
                       bg-gradient-to-b from-[#F7D7A3] to-[#D29B4C] text-[#1A140C]
                       shadow-[0_18px_50px_rgba(210,155,76,0.22)] border border-black/10"
          >
            {step.buttonLabel ?? "Antwort eingeben"}
          </motion.button>

          <p className="text-center text-[12px] text-white/60">
            Wenn du unsicher bist: erst schauen, dann tippen.
          </p>
        </motion.div>

        {/* Modal / Bottom sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/60"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* sheet */}
              <motion.div
                initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.35, ease: [0.16, 0.8, 0.25, 1] }}
                className="absolute bottom-0 left-0 right-0 rounded-t-[28px] border border-white/10 bg-[#0b1a12]/95 px-5 pb-6 pt-5 backdrop-blur-xl"
              >
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/20" />

                <h3 className="text-[16px] font-semibold text-white">
                  Antwort eingeben
                </h3>
                <p className="mt-1 text-[13px] text-white/70">
                  (Kleinschreibung egal. Umlaute sind okay.)
                </p>

                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  autoCapitalize="none"
                  autoCorrect="off"
                  placeholder="z. B. Küche"
                  className="mt-4 w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-4 text-[16px] text-white placeholder:text-white/35 outline-none"
                />

                {error && <p className="mt-3 text-[13px] text-white/80">{error}</p>}
                {step.hint && tries >= 2 && (
                  <p className="mt-2 text-[13px] text-white/70">
                    Hinweis: {step.hint}
                  </p>
                )}

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-4 font-semibold text-white
                               border border-white/12 bg-white/6"
                  >
                    Abbrechen
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.985 }}
                    onClick={check}
                    className="rounded-2xl px-4 py-4 font-semibold text-[#1A140C]
                               bg-gradient-to-b from-[#F7D7A3] to-[#D29B4C]
                               border border-black/10"
                  >
                    Prüfen
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
