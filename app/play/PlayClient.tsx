"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import StepRenderer from "@/components/StepRenderer";
import { stepById } from "@/lib/steps";
import { loadProgress, saveProgress, resetProgress } from "@/lib/progress";

export default function PlayClient() {
  const params = useSearchParams();
  const forced = params.get("s"); // z.B. "step1"

  const [progress, setProgress] = useState(() => {
    if (forced && stepById(forced)) return { currentStepId: forced, solved: [] };
    return loadProgress();
  });

  const step = useMemo(() => {
    return stepById(progress.currentStepId) ?? stepById("step1")!;
  }, [progress.currentStepId]);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const goNext = () => {
    if (!step.next) return;
    setProgress((p) => ({
      currentStepId: step.next!,
      solved: p.solved.includes(step.id) ? p.solved : [...p.solved, step.id],
    }));
  };

  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-[#08120D] text-[#F7F3E8]">
      <div className="px-4 pb-10 pt-6">
        <StepRenderer step={step} onNext={goNext} />
      </div>

      {/* optional: dev reset */}
      <button
        onClick={() => {
          resetProgress();
          location.reload();
        }}
        className="fixed bottom-4 right-4 rounded-full bg-black/40 px-3 py-2 text-xs text-white/70"
      >
        Reset
      </button>
    </main>
  );
}
