// src/components/Scheduler/SchedulerGrid.tsx
import { useDroppable } from "@dnd-kit/core";
import { OrdersList } from "./OrdersList";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineGrid } from "./TimelineGrid";
import { eachDayOfInterval } from "date-fns";
import type { SchedulerViewport, Order, Term } from "../../types";
import { createDimensionStyle } from "@/utils/styles";
import { dateUtils } from "@/utils/date";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";

export const SchedulerGrid: React.FC<{
  viewport: SchedulerViewport;
  orders: Order[];
  terms: Term[];
  onCellClick: (orderId: string, date: Date) => void;
}> = ({ viewport, orders, terms, onCellClick }) => {
  const days = eachDayOfInterval({
    start: dateUtils.toDate(viewport.startDate),
    end: dateUtils.toDate(viewport.endDate)
  });

  return (
    <div className="flex flex-1 overflow-hidden">
      <div
        className="flex-shrink-0 border-r bg-white"
        style={createDimensionStyle("leftColumnWidth")}
      >
        <div
          className="border-b"
          style={createDimensionStyle("headerHeight", "height")}
        />
        <OrdersList orders={orders} />
      </div>

      <div className="flex-1 overflow-auto">
        <TimelineHeader viewport={viewport} days={days} />
        <TimelineGrid
          viewport={viewport}
          orders={orders}
          terms={terms}
          days={days}
          onCellClick={onCellClick}
        />
      </div>
    </div>
  );
};
