const PAISA_MULTIPLIER = 100;

/**
 * Convert rupees (string/number) → paise (integer)
 * Safe for DB storage
 */
export function toPaise(amount: string | number): number {
  const value = Number(amount);

  if (isNaN(value)) return 0;

  return Math.round(value * PAISA_MULTIPLIER);
}

/**
 * Convert paise → rupees (number)
 */
export function fromPaise(paise: number): number {
  if (isNaN(paise)) return 0;

  return paise / PAISA_MULTIPLIER;
}

/**
 * Convert paise → rupees (string with 2 decimals)
 * For UI display
 */
export function formatFromPaise(paise: number): string {
  if (isNaN(paise)) return '0.00';

  return (paise / PAISA_MULTIPLIER).toFixed(2);
}

/**
 * Safe addition in paise (avoids floating issues)
 */
export function addPaise(a: number, b: number): number {
  return (a || 0) + (b || 0);
}

/**
 * Safe subtraction in paise
 */
export function subtractPaise(a: number, b: number): number {
  return (a || 0) - (b || 0);
}

/**
 * Safe multiplication for quantities × rate (both in paise logic)
 * Example: qty * rateInPaise
 */
export function multiply(quantity: number, ratePaise: number): number {
  return (quantity || 0) * (ratePaise || 0);
}

/**
 * Round paise safely (future-proof for tax rules)
 */
export function roundPaise(paise: number): number {
  return Math.round(paise || 0);
}