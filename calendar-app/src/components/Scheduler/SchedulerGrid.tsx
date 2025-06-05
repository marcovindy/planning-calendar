import { useRef } from "react";
import { eachDayOfInterval } from "date-fns";
import { OrdersList } from "./OrdersList";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineGrid } from "./TimelineGrid";
import type { SchedulerViewport, Order, Term } from "../../types";
import { createDimensionStyle } from "@/utils/styles";
import { dateUtils } from "@/utils/date";

const HEADER_HEIGHT = 48;

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

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-1 overflow-hidden">
      <div
        className="flex-shrink-0 border-r bg-white"
        style={createDimensionStyle("leftColumnWidth")}
      >
        <div className="border-b" style={{ height: HEADER_HEIGHT }} />
        <OrdersList orders={orders} />
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div
          className="absolute inset-0 overflow-auto"
          ref={scrollContainerRef}
        >
          <div
            className="sticky top-0 z-10 bg-white"
            style={{
              height: HEADER_HEIGHT,
              width: days.length * viewport.columnWidth
            }}
          >
            <TimelineHeader viewport={viewport} days={days} />
          </div>

          <div
            style={{ minHeight: `calc(100% - ${HEADER_HEIGHT}px)` }}
            className="overflex-x-hidden"
          >
            <TimelineGrid
              viewport={viewport}
              orders={orders}
              terms={terms}
              days={days}
              onCellClick={onCellClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
