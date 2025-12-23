export type StepType = "photoPrompt" | "final";

export type BaseStep = {
  id: string;
  type: StepType;
  next?: string;
};

export type PhotoPromptStep = BaseStep & {
  type: "photoPrompt";
  imageSrc: string;
  headline: string;
  subtext?: string;
  buttonLabel?: string;
  answers: string[];
  hint?: string;
};

export type FinalStep = BaseStep & {
  type: "final";
  title: string;
  text: string;

  // neu:
  question?: string;
  cards?: {
    id: string;
    frontLabel: string;     // Text/Title auf der Rückseite
    frontStyle: "red" | "green" | "gold";
    revealTitle: string;    // was nach dem Flip oben steht
    revealText: string;     // Haupttext der Karte
    isWin: boolean;
  }[];
};


export type Step = PhotoPromptStep | FinalStep;

export const steps: Step[] = [
  {
    id: "step1",
    type: "photoPrompt",
    imageSrc: "/bild1.jpg",
    headline: "Wo befindet sich dieses Objekt?",
    subtext:
      "In deiner Nähe wirst du den ersten Hinweis bekommen. Wenn du ihn gefunden hast, klicke weiter.",
    buttonLabel: "Antwort eingeben",
    answers: ["14", "vierzehn"],
    hint: "Tipp: Schau auf den Zettel.",
    next: "step2",
  },
  {
    id: "step2",
    type: "photoPrompt",
    imageSrc: "/bild2.jpg",
    headline: "Und wo ist dat hier?",
    subtext: "Du bist nah dran. Finde den Hinweis und gib die Lösung ein.",
    buttonLabel: "Lösung eingeben",
    answers: ["gutes gutes essen", "Gutes gutes Essen", "Gutes gutes essen"],
    hint: "Tipp: Dort, wo man oft was holt.",
    next: "step3",
  },
  {
    id: "step3",
    type: "photoPrompt",
    imageSrc: "/bild3.jpg",
    headline: "Letzter Hinweis: Wo gehört das hin?",
    subtext: "Wenn du das findest, bist du im Finale.",
    buttonLabel: "Finale freischalten",
    answers: ["mömax", "Mömax"],
    hint: "Tipp: Da wird’s gemütlich.",
    next: "final",
  },
{
  id: "final",
  type: "final",
  title: "Finale",
  text: "Wähle eine Karte…",

  question: "Eine letzte Sache: Welche Karte ist dein Schicksal?",
  cards: [
    {
      id: "c1",
      frontLabel: "Karte A",
      frontStyle: "red",
      revealTitle: "ZONK",
      revealText: "Leider nichts. Aber schöner Versuch.",
      isWin: false,
    },
    {
      id: "c2",
      frontLabel: "Karte B",
      frontStyle: "green",
      revealTitle: "ZONK",
      revealText: "Auch nix. Aber du bist warm.",
      isWin: false,
    },
    {
      id: "c3",
      frontLabel: "Karte C",
      frontStyle: "gold",
      revealTitle: "HAUPTGEWINN",
      revealText: "Neue Matratze fürs Bett. Frohe Weihnachten ❤️",
      isWin: true,
    },
  ],
},

];

export const stepById = (id: string) => steps.find((s) => s.id === id);
