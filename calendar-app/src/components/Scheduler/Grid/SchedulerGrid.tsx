import { useCallback } from "react";
import { eachDayOfInterval } from "date-fns";
import type { SchedulerViewport, Order, Term } from "../../../types";
import { dateUtils } from "@/utils/date";
import { FixedSizeList } from "react-window";

export const HEADER_HEIGHT = 48;
import { SCHEDULER_CONFIG } from "@/config/scheduler";
import { GridHeader } from "./GridHeader";
import { GridRow } from "./GridRow";

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

  const renderRow = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => (
      <GridRow
        style={style}
        order={orders[index]}
        days={days}
        terms={terms}
        viewport={viewport}
        onCellClick={onCellClick}
        onEditTerm={onEditTerm}
      />
    ),
    [days, terms, viewport, onCellClick, onEditTerm]
  );

  return (
    <div className="flex-1 overflow-hidden">
      <div className="overflow-auto">
        <div className="relative">
          <GridHeader days={days} viewport={viewport} />
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
            {renderRow}
          </FixedSizeList>
        </div>
      </div>
    </div>
  );
};
