import { useState, useCallback } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { addDays, subDays, differenceInDays, format } from "date-fns";
import type { Order, SchedulerViewport, Term } from "../types";
import { sampleOrders, sampleTerms } from "../mock/sample-data";

const generateViewportLabel = (start: Date, end: Date) => {
  return `${format(start, "d.M.yyyy")} - ${format(end, "d.M.yyyy")}`;
};

export const useScheduler = () => {
  const [viewport, setViewport] = useState<SchedulerViewport>({
    startDate: new Date(),
    endDate: addDays(new Date(), 30),
    columnWidth: 60,
    rowHeight: 50,
    label: generateViewportLabel(new Date(), addDays(new Date(), 30))
  });

  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [terms, setTerms] = useState<Term[]>(sampleTerms);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const termId = active.id as string;
    const [dateString, orderId] = (over.id as string).split("-");
    const newDate = new Date(dateString);

    setTerms((prev) =>
      prev.map((term) => {
        if (term.id === termId) {
          const duration = differenceInDays(term.endDate, term.startDate);
          return {
            ...term,
            orderId,
            startDate: newDate,
            endDate: addDays(newDate, duration)
          };
        }
        return term;
      })
    );
  }, []);

  const moveViewport = useCallback((direction: "left" | "right") => {
    setViewport((prev) => {
      const newStartDate =
        direction === "left"
          ? subDays(prev.startDate, 7)
          : addDays(prev.startDate, 7);
      const newEndDate =
        direction === "left"
          ? subDays(prev.endDate, 7)
          : addDays(prev.endDate, 7);

      return {
        ...prev,
        startDate: newStartDate,
        endDate: newEndDate,
        label: generateViewportLabel(newStartDate, newEndDate)
      };
    });
  }, []);

  return {
    viewport,
    orders,
    terms,
    handleDragEnd,
    moveViewport
  };
};
