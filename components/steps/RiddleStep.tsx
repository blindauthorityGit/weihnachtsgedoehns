"use client";
import { RiddleStep } from "@/lib/steps";
import { useState } from "react";
import { isAnswerCorrect } from "@/lib/answer";

export default function RiddleStepCmp({
  step,
  onNext,
}: {
  step: RiddleStep;
  onNext: () => void;
}) {
  const [value, setValue] = useState("");
  const [tries, setTries] = useState(0);
  const [error, setError] = useState("");

  const check = () => {
    const ok = step.answers ? isAnswerCorrect(value, step.answers) : false;
    if (ok) {
      setError("");
      onNext();
      return;
    }
    setTries((t) => t + 1);
    setError("Leider noch nicht. Versuch’s nochmal.");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{step.title}</h2>
      <p className="opacity-90">{step.prompt}</p>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Deine Lösung"
        autoCapitalize="none"
        autoCorrect="off"
      />

      {error && <p className="text-sm">{error}</p>}
      {step.hint && tries >= 2 && (
        <p className="text-sm opacity-80">Hinweis: {step.hint}</p>
      )}

      <button
        onClick={check}
        className="rounded-xl px-4 py-3 bg-black text-white"
      >
        Prüfen
      </button>
    </div>
  );
}
