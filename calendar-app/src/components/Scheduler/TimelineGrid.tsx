import type { SchedulerViewport, Order, Term } from "../../types";
import { TimeBlock } from "./TimeBlock";
import { getDimensionStyle, getHeightStyle } from "@/utils/styles";

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
          <div className="absolute inset-0 flex pointer-events-none">
            {days.map((day) => (
              <div
                key={day.toISOString()}
                className="border-r flex-shrink-0 h-full"
                style={getDimensionStyle("columnWidth")}
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
