export const firstLetterUppercase = (string: string = "") =>
  string.replace(/^\w/, (c) => c.toUpperCase());
