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
  }
};
