import { differenceInDays } from "date-fns/differenceInDays";
import type { SchedulerViewport, Term } from "../types";

export const calculateLeftPosition = (
  date: Date,
  viewport: SchedulerViewport
): number => {
  const diffDays = differenceInDays(date, viewport.startDate);
  return diffDays * viewport.columnWidth;
};

export const calculateWidth = (
  start: Date,
  end: Date,
  viewport: SchedulerViewport
): number => {
  const diffDays = differenceInDays(end, start) + 1;
  return diffDays * viewport.columnWidth;
};

export const getStatusColor = (status: Term["status"]): string => {
  const colors = {
    new: "bg-blue-500 text-white",
    "in-progress": "bg-yellow-500 text-white",
    completed: "bg-green-500 text-white"
  };
  return colors[status];
};
