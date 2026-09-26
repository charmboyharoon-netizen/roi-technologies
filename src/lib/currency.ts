/** Format a whole-number GNF amount the way Guinean retailers display prices. */
export function formatGNF(amount: number): string {
  const rounded = Math.round(amount);
  return `${rounded.toLocaleString("fr-FR")} GNF`;
}
