import type { Order, SchedulerViewport, Term } from "@/types";
import { DroppableColumns } from "./DroppableColumns";
import { TermBlocks } from "./TermBlocks";

interface GridContentProps {
  order: Order;
  days: Date[];
  terms: Term[];
  viewport: SchedulerViewport;
  onCellClick: (orderId: string, date: Date) => void;
  onEditTerm: (term: Term) => void;
}

export const GridContent: React.FC<GridContentProps> = ({
  order,
  days,
  terms,
  viewport,
  onCellClick,
  onEditTerm
}) => (
  <div className="relative flex-1 border-b">
    <DroppableColumns
      days={days}
      orderId={order.id}
      onCellClick={onCellClick}
    />
    <TermBlocks
      terms={terms}
      orderId={order.id}
      viewport={viewport}
      onEditTerm={onEditTerm}
    />
  </div>
);
