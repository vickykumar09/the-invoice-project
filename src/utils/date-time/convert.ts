/**
 * Utility function for converting date object into "YYYY-MM-DD" format.
 * 
 * @param date - The date object we get.
 * @returns a date string in "YYYY-MM-DD" format.
 */

export const toDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};