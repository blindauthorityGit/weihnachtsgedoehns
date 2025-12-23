const KEY = "xmas_hunt_progress_v1";

export type Progress = {
  currentStepId: string;
  solved: string[]; // step ids
};

export const defaultProgress = {
  currentStepId: "step1",
  solved: [],
};

export function loadProgress(): Progress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw) as Progress;
    if (!parsed.currentStepId) return defaultProgress;
    return {
      currentStepId: parsed.currentStepId,
      solved: Array.isArray(parsed.solved) ? parsed.solved : [],
    };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
