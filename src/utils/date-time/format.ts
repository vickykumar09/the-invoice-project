/**
 * Utility functions for formatting Date into human-readable date strings.
 *
 * - formatDate: Converts a Date into
 *   "DD Mon YYYY" format (e.g., "01 Jan 2025").
 *
 * - formatDateWithTime: Converts a timestamp into
 *   "DD Mon YYYY, hh:mm:ss AM/PM" format (e.g., "01 Jan 2025, 03:45:00 PM").
 *
 * Both functions use the `Intl.DateTimeFormat` API with 'en-GB' locale
 * to ensure consistent formatting across platforms.
 */

// Format DateString to String (01 Jan 2025)
export const formatDateString = (
  dateString: string,
  withTime: boolean = false,
  withSecond: boolean = false,
) => {
  const inputDate = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: withTime ? "2-digit" : undefined,
    minute: withTime ? "2-digit" : undefined,
    second: withSecond ? "2-digit" : undefined,
    hour12: true,
  };

  return inputDate
    .toLocaleDateString("en-GB", options)
    .replace("am", "AM")
    .replace("pm", "PM");
};

// Format Date to String
export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options);
};

// check if a date is past the current
export const isSameDay = (d1: Date, d2: Date) =>
  d1.toDateString() === d2.toDateString();

// Get “time ago” (e.g., “5 min ago”) - comparing date with current date
export const timeAgo = (date: Date) => {
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};
// Check if a date is in future to the current

// check if same day
// check if within  7 days
// check if  after 7 days

export function getSmartTimestamp(
  targetDateString: string,
  currentSystemTime = new Date(),
) {
  // 1. Force convert inputs into clean Date objects
  const inputDate = new Date(targetDateString);
  const now = new Date(currentSystemTime);

  // 2. Check if the dates are actually valid numbers before doing math
  if (isNaN(inputDate.getTime()) || isNaN(now.getTime())) {
    return "Updated date unavailable"; // Graceful fallback string
  }

  // 3. Safe calculation (Guaranteed to be valid numbers now)
  const diffInMilliseconds = now.getTime() - inputDate.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

  // 4. Handle future dates safely
  if (diffInSeconds < 0) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return `Updated on ${inputDate.toLocaleDateString("en-GB", options)}`;
  }

  // 5. Under 24 Hours: Show hours ago
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600) || 1;
    return `Updated ${hours} ${hours === 1 ? "hr" : "hrs"} ago`;
  }

  // 6. Under 7 Days: Show days ago
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `Updated ${days} ${days === 1 ? "day" : "days"} ago`;
  }

  // 7. Older than 7 Days: Show absolute date
  const options = { day: "numeric", month: "short", year: "numeric" };
  return `Updated on ${inputDate.toLocaleDateString("en-GB", options)}`;
}

/**
 * TIME utility functions.
 *
 * Provides helpers for:
 * - Formatting a 24-hour time string into a 12-hour AM/PM format.
 * - Converting a time string into a JavaScript Date object.
 */

/**
 * Converts a Date object into a 24-hour time string (`HH:mm`).
 */
export function dateToTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

/**
 * Formats a time string from 24-hour format (`HH:mm`)
 * into 12-hour format with an AM/PM period.
 *
 * @param time - Time in `HH:mm` format, such as `"14:30"`.
 * @returns Formatted time such as `"2:30 PM"`, or an empty string
 * if the provided time is invalid.
 *
 * @example
 * formatTime("09:05") returns "9:05 AM";
 *
 * @example
 * formatTime("14:30") returns "2:30 PM";
 *
 * @example
 * formatTime("25:10") returns "";
 */

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return "";
  }

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

/**
 * Converts a time string into a JavaScript Date object.
 *
 * The returned Date uses the current date and the provided
 * time for its hours and minutes. Seconds and milliseconds
 * are reset to zero.
 *
 * @param time - Time in `HH:mm` format, such as `"14:30"`.
 * @returns A Date object containing the current date and specified time.
 *
 * @example
 * timeToDate("14:30") returns Date representing today at 2:30 PM
 */

export function timeToDate(time: string): Date {
  const date = new Date();
  const [hours, minutes] = time.split(":").map(Number);

  date.setHours(hours, minutes, 0, 0);

  return date;
}
