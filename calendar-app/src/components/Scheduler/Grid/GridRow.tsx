import type { Order, SchedulerViewport, Term } from "@/types";
import { OrderCell } from "./OrderCell";
import { GridContent } from "./GridContent";

interface GridRowProps {
  style: React.CSSProperties;
  order: Order;
  days: Date[];
  terms: Term[];
  viewport: SchedulerViewport;
  onCellClick: (orderId: string, date: Date) => void;
  onEditTerm: (term: Term) => void;
  onDeleteTerm: (termId: string) => void;
}

export const GridRow: React.FC<GridRowProps> = ({
  style,
  order,
  days,
  terms,
  viewport,
  onCellClick,
  onEditTerm,
  onDeleteTerm
}) => (
  <div style={{ ...style, height: viewport.rowHeight }} className="flex">
    <OrderCell order={order} />
    <GridContent
      order={order}
      days={days}
      terms={terms}
      viewport={viewport}
      onCellClick={onCellClick}
      onEditTerm={onEditTerm}
      onDeleteTerm={onDeleteTerm}
    />
  </div>
);
