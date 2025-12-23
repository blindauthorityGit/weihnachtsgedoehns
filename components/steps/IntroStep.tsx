"use client";

import type { IntroStep as IntroStepType } from "@/lib/steps";
import { motion } from "framer-motion";
import { PrimaryButton } from "@/components/ui";

export default function IntroStepView({
  step,
  onNext,
}: {
  step: IntroStepType;
  onNext: () => void;
}) {
  return (
    <div className="space-y-4">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[22px] font-semibold leading-tight"
      >
        {step.title}
      </motion.h2>

      {step.text && (
        <p className="text-[15px] leading-[1.5] text-white/85">{step.text}</p>
      )}

      <PrimaryButton onClick={onNext}>Los geht’s</PrimaryButton>
    </div>
  );
}
