import { schedulerConfig } from "@/config/scheduler";

export const getDimensionStyle = (
  dimension: keyof typeof schedulerConfig.dimensions
) => ({
  width: schedulerConfig.dimensions[dimension]
});

export const getHeightStyle = (
  dimension: keyof typeof schedulerConfig.dimensions
) => ({
  height: schedulerConfig.dimensions[dimension]
});
