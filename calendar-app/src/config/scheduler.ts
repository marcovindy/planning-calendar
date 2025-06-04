import { startOfMonth, endOfMonth, format } from "date-fns";

const today = new Date();
const monthStart = startOfMonth(today);
const monthEnd = endOfMonth(today);

export const SCHEDULER_CONFIG = {
  dimensions: {
    columnWidth: 60,
    rowHeight: 50,
    headerHeight: 48,
    leftColumnWidth: 192
  },
  viewport: {
    defaultStartDate: format(monthStart, "yyyy-MM-dd"),
    defaultEndDate: format(monthEnd, "yyyy-MM-dd")
  },
  moveStep: 7
} as const;

export type SchedulerDimension = keyof typeof SCHEDULER_CONFIG.dimensions;
