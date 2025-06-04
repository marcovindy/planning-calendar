export const schedulerConfig = {
  dimensions: {
    rowHeight: 64,
    columnWidth: 60,
    headerHeight: 48,
    leftColumnWidth: 192
  }
} as const;

export type SchedulerConfig = typeof schedulerConfig;
