/**
 * Utility functions for validating dates.
 * 
 * @param date - The date to validate in `YYYY-MM-DD` format.
 * @param min - The minimum allowed date in `YYYY-MM-DD` format.
 * @param max - The maximum allowed date in `YYYY-MM-DD` format.
 * @returns An error message if validation fails, otherwise null.
 */


export function dateValidator(
  date: string,
  min: Date,
  max: Date
): string | null {
  // Check format (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return "Date must be in YYYY-MM-DD format.";
  }

  const [year, month, day] = date.split("-").map(Number);

  const parsedDate = new Date(year, month - 1, day);

  // Check calendar validity
  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return "Invalid date.";
  }

  const inputTime = new Date(parsedDate).setHours(0, 0, 0, 0);
  const minTime = min.setHours(0, 0, 0, 0);
  const maxTime = max.setHours(0, 0, 0, 0);

  if (inputTime > maxTime) {
    return "Date cannot be in the future.";
  }

  if (inputTime < minTime) {
    return "Date is too old.";
  }

  return null;
}