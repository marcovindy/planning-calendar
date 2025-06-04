import { SCHEDULER_CONFIG, type SchedulerDimension } from "@/config/scheduler";

type StyleGenerator = (value: number) => { [key: string]: number };

const createStyleGenerator =
  (property: string): StyleGenerator =>
  (value: number) => ({ [property]: value });

const dimensionStyleGenerators: Record<string, StyleGenerator> = {
  width: createStyleGenerator("width"),
  height: createStyleGenerator("height")
};

export const createDimensionStyle = (
  dimension: SchedulerDimension,
  styleType: keyof typeof dimensionStyleGenerators = "width"
) => {
  const generator = dimensionStyleGenerators[styleType];
  return generator(SCHEDULER_CONFIG.dimensions[dimension]);
};

export const getDimensionStyle = createDimensionStyle;
export const getHeightStyle = (dimension: SchedulerDimension) =>
  createDimensionStyle(dimension, "height");
