function normalize(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?'"`´]/g, "")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

export function isAnswerCorrect(input: string, answers: string[]) {
  const n = normalize(input);
  return answers.map(normalize).includes(n);
}
