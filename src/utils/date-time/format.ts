/**
 * Formats a date string into a human-readable date and optionally includes time.
 *
 * @param dateString - A date string in either "YYYY-MM-DD" format or ISO format.
 * @param withTime - Whether to include hours and minutes.
 * @param withSecond - Whether to include seconds when time is included.
 *
 * @returns A formatted string in one of these formats:
 * - "01 Jan 2026"
 * - "01 Jan 2026, 09:20 AM"
 * - "01 Jan 2026, 09:20:30 PM"
 *
 * @remarks
 * `withSecond` has an effect only when `withTime` is true.
 */

export function formatDateString(
  dateString: string,
  withTime: boolean = false,
  withSecond: boolean = false,
): string {
  let inputDate: Date;

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split("-").map(Number);
    inputDate = new Date(year, month - 1, day);
  } else {
    inputDate = new Date(dateString);
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: withTime ? "2-digit" : undefined,
    minute: withTime ? "2-digit" : undefined,
    second: withTime && withSecond ? "2-digit" : undefined,
    hour12: true,
  };

  return inputDate
    .toLocaleString("en-GB", options)
    .replace("am", "AM")
    .replace("pm", "PM");
}

/**
 *
 * @param targetDateString
 * @param currentSystemTime
 * @returns
 */

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
 *
 * @param date
 * @returns
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
