"use client";

import type { FinalStep as FinalStepType } from "@/lib/steps";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type CardDef = NonNullable<FinalStepType["cards"]>[number];

function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const fire = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = ["#F7D7A3", "#D29B4C", "#E35D5D", "#7BD389", "#FFFFFF"];
    const particles = Array.from({ length: 200 }).map(() => {
      const x = Math.random() * w;
      const y = -20 - Math.random() * 120;
      const size = 4 + Math.random() * 7;
      const vx = -2.8 + Math.random() * 5.6;
      const vy = 3.2 + Math.random() * 7.2;
      const rot = Math.random() * Math.PI;
      const vr = -0.28 + Math.random() * 0.56;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const life = 105 + Math.floor(Math.random() * 70);
      return { x, y, size, vx, vy, rot, vr, color, life };
    });

    let frame = 0;

    const tick = () => {
      frame += 1;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (p.life <= 0) continue;
        p.life -= 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.rot += p.vr;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, p.life / 50);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.82);
        ctx.restore();
      }

      if (frame < 165) rafRef.current = requestAnimationFrame(tick);
      else {
        ctx.clearRect(0, 0, w, h);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const Canvas = useMemo(() => {
    return function ConfettiCanvas() {
      return (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-[80]"
        />
      );
    };
  }, []);

  return { fire, Canvas };
}

function frontClasses(style: CardDef["frontStyle"]) {
  switch (style) {
    case "red":
      return "from-[#E35D5D] to-[#A22626]";
    case "green":
      return "from-[#7BD389] to-[#1D7A45]";
    case "gold":
    default:
      return "from-[#F7D7A3] to-[#D29B4C]";
  }
}

function FlipCard({
  card,
  disabled,
  onPick,
  isRevealed,
  isWrongShake,
}: {
  card: CardDef;
  disabled: boolean;
  onPick: () => void;
  isRevealed: boolean;
  isWrongShake: boolean;
}) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onPick}
      className="relative h-[122px] w-full rounded-2xl outline-none"
      whileTap={!disabled ? { scale: 0.985 } : undefined}
      style={{ perspective: 1200 }}
      animate={
        isWrongShake
          ? {
              x: [0, -10, 10, -8, 8, -4, 4, 0],
              rotate: [0, -0.6, 0.6, -0.5, 0.5, 0],
            }
          : {}
      }
      transition={{ duration: 0.55 }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.16, 0.9, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className={[
            "absolute inset-0 rounded-2xl border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.25)]",
            "bg-gradient-to-b",
            frontClasses(card.frontStyle),
          ].join(" ")}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <div className="text-[12px] uppercase tracking-[0.24em] text-black/70">
              Umgedreht
            </div>
            <div className="mt-2 text-[18px] font-semibold text-[#1A140C]">
              {card.frontLabel}
            </div>
            <div className="mt-2 text-[12px] text-black/60">
              Tippe zum Aufdecken
            </div>
          </div>
          <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-black/25" />
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/12 bg-[#0b1a12]/95 backdrop-blur-xl"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <div
              className={[
                "text-[12px] uppercase tracking-[0.24em]",
                card.isWin ? "text-[#F7D7A3]" : "text-white/70",
              ].join(" ")}
            >
              {card.revealTitle}
            </div>
            <div className="mt-2 text-[14px] leading-[1.35] text-white/90">
              {card.revealText}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function FinalStep({ step }: { step: FinalStepType }) {
  const cards: CardDef[] =
    step.cards ??
    [
      {
        id: "c1",
        frontLabel: "Karte A",
        frontStyle: "red",
        revealTitle: "ZONK",
        revealText: "Leider nichts. Aber netter Versuch.",
        isWin: false,
      },
      {
        id: "c2",
        frontLabel: "Karte B",
        frontStyle: "green",
        revealTitle: "ZONK",
        revealText: "Auch nix. Dramatisch, oder?",
        isWin: false,
      },
      {
        id: "c3",
        frontLabel: "Karte C",
        frontStyle: "gold",
        revealTitle: "HAUPTGEWINN",
        revealText: "Neue Matratze fürs Bett ❤️",
        isWin: true,
      },
    ];

  const { fire, Canvas } = useConfetti();

  const [pickedId, setPickedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [locked, setLocked] = useState(false);

  const [wrongFx, setWrongFx] = useState(false);
  const [shakeId, setShakeId] = useState<string | null>(null);

  const [afterText, setAfterText] = useState<string | null>(null);

  // WIN overlay
  const [winOverlay, setWinOverlay] = useState(false);

  const pickedCard = useMemo(
    () => cards.find((c) => c.id === pickedId) ?? null,
    [cards, pickedId]
  );

  const pick = (id: string) => {
    if (locked) return;
    if (pickedId) return;
    setPickedId(id);
    window.setTimeout(() => setRevealed(true), 180);
  };

  useEffect(() => {
    if (!pickedCard || !revealed) return;

    const t = window.setTimeout(() => {
      if (pickedCard.isWin) {
        // lock + confetti + upscale overlay
        setLocked(true);
        fire();
        setAfterText("Okay. Das zählt. Hauptgewinn ist real.");
        // give the user a beat, then explode the fullscreen overlay
        window.setTimeout(() => setWinOverlay(true), 250);
        return;
      }

      // wrong: show alarm + flash + shake, then reset
      setAfterText("ZONK. Kurzer Schreckmoment… und dann: nochmal!");
      setWrongFx(true);
      setShakeId(pickedCard.id);

      const t2 = window.setTimeout(() => {
        setWrongFx(false);
        setShakeId(null);
        setAfterText(null);
        setRevealed(false);
        setPickedId(null);
      }, 2000);

      return () => window.clearTimeout(t2);
    }, 780);

    return () => window.clearTimeout(t);
  }, [pickedCard, revealed, fire]);

  return (
    <div className="relative">
      <Canvas />

      {/* Wrong overlay flash */}
      <AnimatePresence>
        {wrongFx && !locked && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[55]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#E35D5D]/25"
              animate={{ opacity: [0.05, 0.45, 0.08, 0.35, 0] }}
              transition={{ duration: 0.9 }}
            />
            <motion.div
              className="absolute left-1/2 top-16 -translate-x-1/2 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-[12px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-xl"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
            >
              Alarm: Falsch!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, ease: [0.16, 0.8, 0.25, 1] }}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 backdrop-blur-xl">
          <span className="text-[12px] uppercase tracking-[0.24em] text-white/80">
            Finale
          </span>
          <motion.span
            aria-hidden
            className="h-2 w-2 rounded-full bg-[#F7D7A3]"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
        </div>

        <h2 className="text-[24px] font-semibold leading-[1.1] text-[#F7F3E8]">
          {step.question ?? "Letzte Frage: Welche Karte nimmst du?"}
        </h2>

        <p className="text-[14px] leading-[1.5] text-white/80">
          {locked
            ? "Das ist final. Kein Zurück. Kein Drehen. Nur Luxus."
            : pickedId
            ? "Okay… jetzt passiert’s."
            : "Tippe eine Karte an. Zwei sind ZONK. Eine ist Hauptgewinn."}
        </p>

        <div className="grid gap-3">
          {cards.map((c) => {
            const isPicked = pickedId === c.id;
            const isRevealed = isPicked && revealed;

            const disabled = locked
              ? true
              : pickedId
              ? !isPicked
              : false;

            return (
              <FlipCard
                key={c.id}
                card={c}
                disabled={disabled}
                onPick={() => pick(c.id)}
                isRevealed={isRevealed}
                isWrongShake={shakeId === c.id && wrongFx}
              />
            );
          })}
        </div>

        <AnimatePresence>
          {afterText && (
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 0.8, 0.25, 1] }}
              className={[
                "mt-4 rounded-2xl border px-4 py-4 backdrop-blur-xl",
                locked
                  ? "border-[#F7D7A3]/25 bg-[#F7D7A3]/10"
                  : "border-white/10 bg-white/6",
              ].join(" ")}
            >
              <p className="text-[14px] leading-[1.55] text-white/85">
                {afterText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* WIN FULLSCREEN EXPAND */}
      <AnimatePresence>
        {winOverlay && pickedCard?.isWin && (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* center expanding card */}
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 0.9, 0.2, 1] }}
              className="absolute inset-x-4 top-[10vh] rounded-[28px] border border-white/12 bg-[#0b1a12]/95 shadow-[0_35px_120px_rgba(0,0,0,0.65)]"
            >
              {/* “expanded” content */}
              <div className="p-5">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-[#F7D7A3]/25 bg-[#F7D7A3]/10 px-3 py-1.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <span className="text-[12px] uppercase tracking-[0.22em] text-[#F7D7A3]">
                    Hauptgewinn
                  </span>
                  <motion.span
                    aria-hidden
                    className="h-2 w-2 rounded-full bg-[#F7D7A3]"
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                </motion.div>

                <motion.h3
                  className="mt-4 text-[22px] font-semibold leading-[1.1] text-white"
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.15, duration: 0.45 }}
                >
                  Neue Matratze fürs Bett.
                </motion.h3>

                <motion.p
                  className="mt-2 text-[14px] leading-[1.55] text-white/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.45 }}
                >
                  Frohe Weihnachten ❤️ Du hast sie dir ehrlich verdient.
                </motion.p>

                {/* Final image */}
                <motion.div
                  className="relative mt-5 overflow-hidden rounded-2xl border border-white/10"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.28, duration: 0.45 }}
                >
                  <motion.div
                    className="relative aspect-[4/3] w-full"
                    animate={{
                      scale: [1, 1.03, 1],
                      rotate: [0, -0.4, 0.4, 0],
                    }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image
                      src="/final.webp"
                      alt="Hauptgewinn"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                    {/* subtle glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(247,215,163,0.18),transparent_60%)]" />
                  </motion.div>
                </motion.div>

                {/* cheesy bounce stamp */}
                <motion.div
                  className="mt-5 rounded-2xl border border-white/10 bg-white/6 px-4 py-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34, duration: 0.45 }}
                >
                  <motion.div
                    className="text-[12px] uppercase tracking-[0.24em] text-white/70"
                    animate={{ opacity: [0.65, 1, 0.65] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  >
                    Mission completed
                  </motion.div>
                  <div className="mt-2 text-[14px] text-white/85">
                    Ab jetzt gibt’s nur noch: schlafen wie ein König.
                  </div>
                </motion.div>
              </div>

              {/* small bottom spacer for safe area */}
              <div className="h-4" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
