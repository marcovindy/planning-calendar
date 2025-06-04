import { useState, useCallback } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { addDays, subDays, differenceInDays, format, parse } from "date-fns";
import type { Order, SchedulerViewport, Term } from "../types";
import { sampleOrders, sampleTerms } from "../mock/sample-data";

const toDate = (dateString: string) =>
  parse(dateString, "yyyy-MM-dd", new Date());
const toDateString = (date: Date) => format(date, "yyyy-MM-dd");

const generateViewportLabel = (start: string, end: string) => {
  return `${format(toDate(start), "d.M.yyyy")} - ${format(
    toDate(end),
    "d.M.yyyy"
  )}`;
};

export const useScheduler = () => {
  const [viewport, setViewport] = useState<SchedulerViewport>({
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    columnWidth: 60,
    rowHeight: 50,
    label: generateViewportLabel("2025-06-01", "2025-06-30")
  });

  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [terms, setTerms] = useState<Term[]>(sampleTerms);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const termId = active.id as string;
    const [dateString, orderId] = (over.id as string).split("-");

    setTerms((prev) =>
      prev.map((term) => {
        if (term.id === termId) {
          const startDate = toDate(term.startDate);
          const endDate = toDate(term.endDate);
          const duration = differenceInDays(endDate, startDate);
          const newStartDate = toDate(dateString);
          const newEndDate = addDays(newStartDate, duration);

          return {
            ...term,
            orderId,
            startDate: toDateString(newStartDate),
            endDate: toDateString(newEndDate)
          };
        }
        return term;
      })
    );
  }, []);

  const moveViewport = useCallback((direction: "left" | "right") => {
    setViewport((prev) => {
      const currentStart = toDate(prev.startDate);
      const currentEnd = toDate(prev.endDate);

      const newStartDate =
        direction === "left"
          ? subDays(currentStart, 7)
          : addDays(currentStart, 7);

      const newEndDate =
        direction === "left" ? subDays(currentEnd, 7) : addDays(currentEnd, 7);

      const newStartString = toDateString(newStartDate);
      const newEndString = toDateString(newEndDate);

      return {
        ...prev,
        startDate: newStartString,
        endDate: newEndString,
        label: generateViewportLabel(newStartString, newEndString)
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
