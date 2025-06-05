import { useDroppable } from "@dnd-kit/core";
import type { SchedulerViewport, Order, Term } from "../../types";
import { TimeBlock } from "./TimeBlock";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import React from "react";
import { DroppableColumn } from "./DropabbleColumn";
import { isTermInViewport } from "@/utils/date";

interface TimelineGridProps {
  viewport: SchedulerViewport;
  orders: Order[];
  terms: Term[];
  days: Date[];
  onCellClick: (orderId: string, date: Date) => void;
  onEditTerm: (term: Term) => void;
  style?: React.CSSProperties;
}

export const TimelineGrid: React.FC<TimelineGridProps> = ({
  viewport,
  orders,
  terms,
  days,
  onCellClick,
  onEditTerm,
  style
}) => {
  const Row = React.useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const order = orders[index];
      return (
        <div style={style} className="relative border-b flex items-center">
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

          {/* Term Blocks */}
          <div className="absolute inset-0 pointer-events-none">
            {terms
              .filter(
                (term) =>
                  term.orderId === order.id && isTermInViewport(term, viewport)
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
      );
    },
    [orders, days, terms, viewport, onCellClick]
  );

  return (
    <AutoSizer>
      {({ height, width }) => {
        const desiredWidth = days.length * viewport.columnWidth;
        const finalWidth = Math.max(width, desiredWidth);

        return (
          <div style={{ width: finalWidth, height }}>
            <List
              height={height || 0}
              width={finalWidth}
              itemCount={orders.length}
              itemSize={viewport.rowHeight}
              overscanCount={20}
            >
              {Row}
            </List>
          </div>
        );
      }}
    </AutoSizer>
  );
};
