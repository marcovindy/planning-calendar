import { useCallback } from "react";
import { eachDayOfInterval } from "date-fns";
import { TimelineHeader } from "./TimelineHeader";
import type { SchedulerViewport, Order, Term } from "../../types";
import { dateUtils, isTermInViewport } from "@/utils/date";
import { FixedSizeList } from "react-window";

const HEADER_HEIGHT = 48;

import { DroppableColumn } from "./DropabbleColumn";
import { TimeBlock } from "./TimeBlock";
import { SCHEDULER_CONFIG } from "@/config/scheduler";

export const SchedulerGrid: React.FC<{
  viewport: SchedulerViewport;
  orders: Order[];
  terms: Term[];
  onCellClick: (orderId: string, date: Date) => void;
  onEditTerm: (term: Term) => void;
}> = ({ viewport, orders, terms, onCellClick, onEditTerm }) => {
  const days = eachDayOfInterval({
    start: dateUtils.toDate(viewport.startDate),
    end: dateUtils.toDate(viewport.endDate)
  });

  const GridRow = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const order = orders[index];
      return (
        <div style={style} className="flex">
          <div
            className="sticky [will-change:transform] [backface-visibility:hidden] left-0 z-20 bg-white border-r flex-shrink-0 border-b"
            style={{ width: SCHEDULER_CONFIG.dimensions.leftColumnWidth }}
          >
            <div className="p-2">
              <div className="font-medium">{order.code}</div>
              <div className="text-sm text-gray-600">{order.name}</div>
            </div>
          </div>

          {/* Grid content */}
          <div className="relative flex-1 border-b">
            {/* Droppable Grid */}
            <div className="absolute inset-0 flex pointer-events-none">
              {days.map((day) => (
                <DroppableColumn
                  key={day.toISOString()}
                  day={day}
                  orderId={order.id}
                  onCellClick={onCellClick}
                />
              ))}
            </div>

            {/* Terms */}
            <div className="absolute inset-0 pointer-events-none">
              {terms
                .filter(
                  (term) =>
                    term.orderId === order.id &&
                    isTermInViewport(term, viewport)
                )
                .map((term) => (
                  <TimeBlock
                    key={term.id}
                    term={term}
                    viewport={viewport}
                    onEdit={onEditTerm}
                  />
                ))}
            </div>
          </div>
        </div>
      );
    },
    [days, terms, viewport, onCellClick, onEditTerm]
  );

  return (
    <div className="flex-1 overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white flex">
        <div
          className="sticky left-0 z-30 bg-white border-r border-b flex-shrink-0"
          style={{
            width: SCHEDULER_CONFIG.dimensions.leftColumnWidth,
            height: HEADER_HEIGHT
          }}
        />

        {/* Timeline header */}
        <div
          className="flex border-b"
          style={{
            width: days.length * viewport.columnWidth,
            height: HEADER_HEIGHT
          }}
        >
          <TimelineHeader viewport={viewport} days={days} />
        </div>
      </div>

      {/* Main scrollable container */}
      <div className="overflow-auto">
        <FixedSizeList
          height={window.innerHeight - HEADER_HEIGHT}
          width={
            days.length * viewport.columnWidth +
            SCHEDULER_CONFIG.dimensions.leftColumnWidth
          }
          itemCount={orders.length}
          itemSize={viewport.rowHeight}
          overscanCount={5}
        >
          {GridRow}
        </FixedSizeList>
      </div>
    </div>
  );
};
