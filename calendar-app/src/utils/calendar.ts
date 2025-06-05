import type { SchedulerViewport, Term } from "@/types";
import { differenceInDays, startOfDay } from "date-fns";

const maxDate = (date1: Date, date2: Date): Date => {
  return date1.getTime() > date2.getTime() ? date1 : date2;
};

const minDate = (date1: Date, date2: Date): Date => {
  return date1.getTime() < date2.getTime() ? date1 : date2;
};

export const calculateLeftPosition = (
  date: Date,
  viewportStart: Date,
  columnWidth: number
): number => {
  const normalizedDate = startOfDay(date);
  const normalizedViewportStart = startOfDay(viewportStart);
  const effectiveStart = maxDate(normalizedDate, normalizedViewportStart);

  const diffDays = differenceInDays(effectiveStart, normalizedViewportStart);
  return Math.max(0, diffDays * columnWidth);
};

export const calculateWidth = (
  start: Date,
  end: Date,
  viewportStart: Date,
  viewportEnd: Date,
  columnWidth: number
): number => {
  const normalizedStart = startOfDay(start);
  const normalizedEnd = startOfDay(end);
  const normalizedViewportStart = startOfDay(viewportStart);
  const normalizedViewportEnd = startOfDay(viewportEnd);

  const effectiveStart = maxDate(normalizedStart, normalizedViewportStart);
  const effectiveEnd = minDate(normalizedEnd, normalizedViewportEnd);

  const diffDays = differenceInDays(effectiveEnd, effectiveStart) + 1;
  return Math.max(0, diffDays * columnWidth);
};

export const getStatusColor = (status: Term["status"]): string => {
  const colors = {
    new: "bg-blue-500 text-white",
    "in-progress": "bg-yellow-500 text-white",
    completed: "bg-green-500 text-white"
  };
  return colors[status];
};

export const isTermTruncated = (term: Term, viewport: SchedulerViewport) => {
  const termStart = startOfDay(new Date(term.startDate));
  const termEnd = startOfDay(new Date(term.endDate));
  const viewportStart = startOfDay(new Date(viewport.startDate));
  const viewportEnd = startOfDay(new Date(viewport.endDate));

  return {
    start: termStart < viewportStart,
    end: termEnd > viewportEnd
  };
};
