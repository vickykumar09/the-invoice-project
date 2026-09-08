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
}