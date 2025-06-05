import type { SchedulerViewport, Term } from "@/types";
import { format, parse } from "date-fns";

export const dateUtils = {
  toDate: (dateString: string) => parse(dateString, "yyyy-MM-dd", new Date()),

  toString: (date: Date) => format(date, "yyyy-MM-dd"),

  isValid: (dateString: string): boolean => {
    try {
      const date = dateUtils.toDate(dateString);
      return !isNaN(date.getTime());
    } catch {
      return false;
    }
  },

  generateLabel: (start: string, end: string) => {
    return `${format(dateUtils.toDate(start), "d.M.yyyy")} - ${format(
      dateUtils.toDate(end),
      "d.M.yyyy"
    )}`;
  },

  hasOverlap: (start1: Date, end1: Date, start2: Date, end2: Date): boolean => {
    return !(end1 < start2 || start1 > end2);
  }
};

export const isTermInViewport = (term: Term, viewport: SchedulerViewport) => {
  const termStart = new Date(term.startDate);
  const termEnd = new Date(term.endDate);
  const viewportStart = new Date(viewport.startDate);
  const viewportEnd = new Date(viewport.endDate);

  return termStart <= viewportEnd && termEnd >= viewportStart;
};
