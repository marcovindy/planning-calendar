import { useDroppable } from "@dnd-kit/core";
import type { SchedulerViewport, Order, Term } from "../../types";
import { TimeBlock } from "./TimeBlock";
import {
  createDimensionStyle,
  getDimensionStyle,
  getHeightStyle
} from "@/utils/styles";
import { format } from "date-fns";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import React from "react";

interface DroppableColumnProps {
  day: Date;
  orderId: string;
  onCellClick: (orderId: string, date: Date) => void;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  day,
  orderId,
  onCellClick
}) => {
  const dateString = format(day, "yyyy-MM-dd");

  const { setNodeRef, isOver } = useDroppable({
    id: `${dateString}-${orderId}`
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("start");
    onCellClick(orderId, day);
  };

  return (
    <div
      onClick={handleClick}
      ref={setNodeRef}
      className={`
        border-r flex-shrink-0 h-full 
        cursor-pointer
        hover:bg-gray-100
        transition-colors
        z-0 
        relative
            pointer-events-auto 
        ${isOver ? "bg-blue-100" : ""}
      `}
      style={createDimensionStyle("columnWidth")}
    />
  );
};

interface TimelineGridProps {
  viewport: SchedulerViewport;
  orders: Order[];
  terms: Term[];
  days: Date[];
  onCellClick: (orderId: string, date: Date) => void;
  style?: React.CSSProperties;
}

export const TimelineGrid: React.FC<TimelineGridProps> = ({
  viewport,
  orders,
  terms,
  days,
  onCellClick,
  style
}) => {
  const Row = React.useMemo(
    () =>
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
                .filter((term) => term.orderId === order.id)
                .map((term) => (
                  <TimeBlock key={term.id} term={term} viewport={viewport} />
                ))}
            </div>
          </div>
        );
      },
    [orders, days, terms, viewport]
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          itemCount={orders.length}
          itemSize={viewport.rowHeight}
          overscanCount={20}
          useIsScrolling
          initialScrollOffset={0}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};
