import { useState, useCallback } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import type { Order } from "../types";
// import { sampleOrders, sampleTerms } from "../mock/sample-data";
import { mockOrders, mockTerms } from "../mock/data";
import { SCHEDULER_CONFIG } from "@/config/scheduler";
import { useViewport } from "./useViewport";
import { dateUtils } from "@/utils/date";
import { useTerms } from "./useTerms";
import type { OrderFormData } from "@/schemas/order";
import { useTreeOrders } from "./useTreeOrders";

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

  const [scrollPosition, setScrollPosition] = useState(0);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { terms, updateTerm, moveTerm, addTerm, deleteTerm } =
    useTerms(mockTerms);
  const { visibleOrders, toggleExpand, isExpanded } = useTreeOrders(orders);

  const handleScroll = useCallback(
    ({ scrollOffset }: { scrollOffset: number }) => {
      setScrollPosition(scrollOffset);
    },
    []
  );

  const addOrder = useCallback((data: OrderFormData) => {
    const newOrder: Order = {
      id: `o${Date.now()}`,
      code: data.code,
      name: data.name
    };

    setOrders((prev) => [...prev, newOrder]);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      const termId = active.id as string;
      const [year, month, day, targetOrderId] = (over.id as string).split("-");
      const newDateString = `${year}-${month}-${day}`;

      const term = terms.find((t) => t.id === termId);
      if (!term) return;

      if (term.orderId !== targetOrderId) {
        console.warn("Cannot move term to different order");
        return;
      }

      if (!dateUtils.isValid(newDateString)) {
        console.error("Invalid date format:", newDateString);
        return;
      }

      moveTerm(termId, newDateString);
    },
    [moveTerm, terms]
  );

  return {
    viewport,
    orders: visibleOrders,
    terms,
    handleDragEnd,
    moveViewport,
    updateTerm,
    moveTerm,
    addTerm,
    deleteTerm,
    addOrder,
    scrollPosition,
    handleScroll,
    toggleExpand,
    isExpanded
  };
};
