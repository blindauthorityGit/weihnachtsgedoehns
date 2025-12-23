"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export function FrostCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/10 bg-white/6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={clsx(
        "w-full rounded-2xl px-5 py-4 text-[16px] font-semibold tracking-wide",
        "bg-gradient-to-b from-[#F7D7A3] to-[#D29B4C] text-[#1A140C]",
        "shadow-[0_18px_40px_rgba(210,155,76,0.25)]",
        "border border-black/10",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export function GhostButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        "w-full rounded-2xl px-5 py-4 text-[15px] font-semibold",
        "bg-white/6 border border-white/12 text-[#F7F3E8]",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
