import { useDroppable } from "@dnd-kit/core";
import type { SchedulerViewport, Order, Term } from "../../types";
import { TimeBlock } from "./TimeBlock";
import {
  createDimensionStyle,
  getDimensionStyle,
  getHeightStyle
} from "@/utils/styles";
import { format } from "date-fns";

interface DroppableColumnProps {
  day: Date;
  orderId: string;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ day, orderId }) => {
  const dateString = format(day, "yyyy-MM-dd");

  const { setNodeRef, isOver } = useDroppable({
    id: `${dateString}-${orderId}`
  });

  return (
    <div
      ref={setNodeRef}
      className={`border-r flex-shrink-0 h-full ${isOver ? "bg-blue-100" : ""}`}
      style={createDimensionStyle("columnWidth")}
    />
  );
};

interface TimelineGridProps {
  viewport: SchedulerViewport;
  orders: Order[];
  terms: Term[];
  days: Date[];
}

export const TimelineGrid: React.FC<TimelineGridProps> = ({
  viewport,
  orders,
  terms,
  days
}) => {
  return (
    <div className="relative">
      {orders.map((order) => (
        <div
          key={order.id}
          className="relative border-b flex items-center"
          style={getHeightStyle("rowHeight")}
        >
          <div className="absolute inset-0 flex">
            {days.map((day) => (
              <DroppableColumn
                key={day.toISOString()}
                day={day}
                orderId={order.id}
              />
            ))}
          </div>

          <div className="relative w-full h-full">
            {terms
              .filter((term) => term.orderId === order.id)
              .map((term) => (
                <TimeBlock key={term.id} term={term} viewport={viewport} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
