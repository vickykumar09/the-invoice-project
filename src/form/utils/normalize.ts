/**
 * Converts an empty string to `null`.
 * Returns the original value when it is not empty.
 */

export function normalizeOptionalString(value: string) {
  return value.trim() === "" ? null : value;
}

export function normalizeBooleanString(value: string) {
  return value === 'true' ? true : false
}