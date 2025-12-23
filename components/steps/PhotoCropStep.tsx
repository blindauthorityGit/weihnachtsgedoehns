"use client";
import Image from "next/image";
import { PhotoCropStep } from "@/lib/steps";
import { useMemo, useState } from "react";

export default function PhotoCropStepCmp({
  step,
  onNext,
}: {
  step: PhotoCropStep;
  onNext: () => void;
}) {
  const [zoom, setZoom] = useState(step.zoom ?? 2);

  const style = useMemo(() => {
    const x = (step.focusX ?? 0.5) * 100;
    const y = (step.focusY ?? 0.5) * 100;
    return {
      transform: `scale(${zoom})`,
      transformOrigin: `${x}% ${y}%`,
    } as React.CSSProperties;
  }, [step.focusX, step.focusY, zoom]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{step.title}</h2>
      {step.text && <p className="opacity-90">{step.text}</p>}

      <div className="overflow-hidden rounded-2xl border">
        <div className="relative aspect-[4/3] w-full">
          <div style={style} className="absolute inset-0">
            <Image
              src={step.imageSrc}
              alt="Hinweisbild"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm opacity-80">Zoom</label>
        <input
          type="range"
          min={1}
          max={4}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <button
        onClick={onNext}
        className="rounded-xl px-4 py-3 bg-black text-white"
      >
        Weiter
      </button>
    </div>
  );
}
