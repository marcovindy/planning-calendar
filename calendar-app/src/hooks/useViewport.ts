import { SCHEDULER_CONFIG } from "@/config/scheduler";
import type { SchedulerViewport } from "@/types";
import { dateUtils } from "@/utils/date";
import { addDays, subDays } from "date-fns";
import { useCallback, useState } from "react";

export const useViewport = (initialViewport: SchedulerViewport) => {
  const [viewport, setViewport] = useState(initialViewport);

  const moveViewport = useCallback((direction: "left" | "right") => {
    setViewport((prev) => {
      const currentStart = dateUtils.toDate(prev.startDate);
      const currentEnd = dateUtils.toDate(prev.endDate);
      const step = SCHEDULER_CONFIG.moveStep;

      const newStartDate =
        direction === "left"
          ? subDays(currentStart, step)
          : addDays(currentStart, step);

      const newEndDate =
        direction === "left"
          ? subDays(currentEnd, step)
          : addDays(currentEnd, step);

      const newStartString = dateUtils.toString(newStartDate);
      const newEndString = dateUtils.toString(newEndDate);

      return {
        ...prev,
        startDate: newStartString,
        endDate: newEndString,
        label: dateUtils.generateLabel(newStartString, newEndString)
      };
    });
  }, []);

  return { viewport, moveViewport };
};
