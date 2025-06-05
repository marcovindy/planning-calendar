import type { SchedulerViewport, Term } from "@/types";
import { format, parse, startOfDay } from "date-fns";

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
    const s1 = startOfDay(start1).getTime();
    const e1 = startOfDay(end1).getTime();
    const s2 = startOfDay(start2).getTime();
    const e2 = startOfDay(end2).getTime();

    const overlap = s2 < e1 && e2 > s1;

    return overlap;
  }
};

export const isTermInViewport = (term: Term, viewport: SchedulerViewport) => {
  const termStart = new Date(term.startDate);
  const termEnd = new Date(term.endDate);
  const viewportStart = new Date(viewport.startDate);
  const viewportEnd = new Date(viewport.endDate);

  return termStart <= viewportEnd && termEnd >= viewportStart;
};
