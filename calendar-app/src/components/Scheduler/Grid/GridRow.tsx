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
}

export const GridRow: React.FC<GridRowProps> = ({
  style,
  order,
  days,
  terms,
  viewport,
  onCellClick,
  onEditTerm
}) => (
  <div style={style} className="flex">
    <OrderCell order={order} />
    <GridContent
      order={order}
      days={days}
      terms={terms}
      viewport={viewport}
      onCellClick={onCellClick}
      onEditTerm={onEditTerm}
    />
  </div>
);
