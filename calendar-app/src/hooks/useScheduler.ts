// src/hooks/useScheduler.ts
import { useState, useCallback } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import type { Order } from "../types";
import { sampleOrders, sampleTerms } from "../mock/sample-data";
import { SCHEDULER_CONFIG } from "@/config/scheduler";
import { useViewport } from "./useViewport";
import { dateUtils } from "@/utils/date";
import { useTerms } from "./useTerms";

export const useScheduler = () => {
  const { viewport, moveViewport } = useViewport({
    startDate: SCHEDULER_CONFIG.viewport.defaultStartDate,
    endDate: SCHEDULER_CONFIG.viewport.defaultEndDate,
    columnWidth: SCHEDULER_CONFIG.dimensions.columnWidth,
    rowHeight: SCHEDULER_CONFIG.dimensions.rowHeight,
    label: dateUtils.generateLabel(
      SCHEDULER_CONFIG.viewport.defaultStartDate,
      SCHEDULER_CONFIG.viewport.defaultEndDate
    )
  });

  const [orders] = useState<Order[]>(sampleOrders);
  const { terms, updateTerm, moveTerm, addTerm, deleteTerm } =
    useTerms(sampleTerms);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      const termId = active.id as string;
      const [year, month, day, orderId] = (over.id as string).split("-");
      const newDateString = `${year}-${month}-${day}`;

      if (!dateUtils.isValid(newDateString)) {
        console.error("Invalid date format:", newDateString);
        return;
      }

      moveTerm(termId, newDateString, orderId);
    },
    [moveTerm]
  );

  return {
    viewport,
    orders,
    terms,
    handleDragEnd,
    moveViewport,
    updateTerm,
    moveTerm,
    addTerm,
    deleteTerm
  };
};
