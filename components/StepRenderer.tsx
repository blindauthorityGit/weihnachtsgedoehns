"use client";

import type { Step } from "@/lib/steps";
import PhotoPromptStep from "@/components/steps/PhotoPromptStep";
import FinalStep from "@/components/steps/FinalStep";

export default function StepRenderer({
  step,
  onNext,
}: {
  step: Step;
  onNext: () => void;
}) {
  switch (step.type) {
    case "photoPrompt":
      return <PhotoPromptStep step={step} onNext={onNext} />;
    case "final":
      return <FinalStep step={step} />;
    default:
      return null;
  }
}
