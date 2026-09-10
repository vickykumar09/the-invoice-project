/**
 * Converts an empty or whitespace-only string to `null`.
 * 
 * @param value - The string value to normalize.
 * @returns `null` if the value is empty or contains only whitespace; otherwise, the original value. 
 */
export function normalizeOptionalString(value: string) {
  return value.trim() === "" ? null : value;
}

/**
 * Converts a string boolean value to a JavaScript boolean.
 * 
 * @param value - The string value, expected to be "true" or "false".
 * @returns `true` when the value is "true"; otherwise, `false`.
 */
export function normalizeBooleanString(value: string) {
  return value === 'true';
}