import { format, formatDistanceToNow, parseISO } from "date-fns";

export function formatDate(date, pattern = "dd MM yyyy") {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, pattern);
}

export function formatRelative(date) {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addsuffix: true });
}
