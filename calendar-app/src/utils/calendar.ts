import type { Term } from "@/types";
import { differenceInDays, startOfDay } from "date-fns";

export const calculateLeftPosition = (
  date: Date,
  viewportStart: Date,
  columnWidth: number
): number => {
  const normalizedDate = startOfDay(date);
  const normalizedViewportStart = startOfDay(viewportStart);
  const diffDays = differenceInDays(normalizedDate, normalizedViewportStart);

  return diffDays * columnWidth;
};

export const calculateWidth = (
  start: Date,
  end: Date,
  columnWidth: number
): number => {
  const normalizedStart = startOfDay(start);
  const normalizedEnd = startOfDay(end);
  const diffDays = differenceInDays(normalizedEnd, normalizedStart) + 1;

  return diffDays * columnWidth;
};

export const getStatusColor = (status: Term["status"]): string => {
  const colors = {
    new: "bg-blue-500 text-white",
    "in-progress": "bg-yellow-500 text-white",
    completed: "bg-green-500 text-white"
  };
  return colors[status];
};
