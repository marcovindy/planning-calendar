import { useCallback } from "react";
import { eachDayOfInterval } from "date-fns";
import type { SchedulerViewport, Order, Term } from "../../../types";
import { dateUtils } from "@/utils/date";
import { FixedSizeList } from "react-window";
import { SCHEDULER_CONFIG } from "@/config/scheduler";
import { GridHeader } from "./GridHeader";
import { GridRow } from "./GridRow";

interface SchedulerGridProps {
  viewport: SchedulerViewport;
  orders: Order[];
  terms: Term[];
  onCellClick: (orderId: string, date: Date) => void;
  onEditTerm: (term: Term) => void;
  onDeleteTerm: (termId: string) => void;
  onToggleExpand: (orderId: string) => void;
  isExpanded: (id: string) => boolean;
}

export const SchedulerGrid: React.FC<SchedulerGridProps> = ({
  viewport,
  orders,
  terms,
  onCellClick,
  onEditTerm,
  onDeleteTerm,
  onToggleExpand,
  isExpanded
}) => {
  const days = eachDayOfInterval({
    start: dateUtils.toDate(viewport.startDate),
    end: dateUtils.toDate(viewport.endDate)
  });

  const renderRow = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const order = orders[index];
      return (
        <GridRow
          style={style}
          order={order}
          days={days}
          terms={terms}
          viewport={viewport}
          onCellClick={onCellClick}
          onEditTerm={onEditTerm}
          onDeleteTerm={onDeleteTerm}
          onToggleExpand={onToggleExpand}
          isExpanded={isExpanded(order.id)}
        />
      );
    },
    [
      days,
      terms,
      viewport,
      onCellClick,
      onEditTerm,
      onDeleteTerm,
      onToggleExpand,
      isExpanded
    ]
  );

  return (
    <div className="flex-1 overflow-hidden">
      <div className="overflow-auto">
        <div className="relative">
          <GridHeader days={days} viewport={viewport} />
          <FixedSizeList
            height={
              window.innerHeight - SCHEDULER_CONFIG.dimensions.headerHeight
            }
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
