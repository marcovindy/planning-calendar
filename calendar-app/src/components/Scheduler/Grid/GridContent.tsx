import type { Order, SchedulerViewport, Term } from "@/types";
import { DroppableColumns } from "./DroppableColumns";
import { TermBlocks } from "./TermBlocks";
import { DroppableColumn } from "../DropabbleColumn";
import { isTermInViewport } from "@/utils/date";
import { TimeBlock } from "../TimeBlock";

interface GridContentProps {
  order: Order;
  days: Date[];
  terms: Term[];
  viewport: SchedulerViewport;
  onCellClick: (orderId: string, date: Date) => void;
  onEditTerm: (term: Term) => void;
  onDeleteTerm: (termId: string) => void;
}

export const GridContent: React.FC<GridContentProps> = ({
  order,
  days,
  terms,
  viewport,
  onCellClick,
  onEditTerm,
  onDeleteTerm
}) => (
  <div
    className="relative flex-1 border-b"
    style={{ height: viewport.rowHeight }}
  >
    {/* DroppableColumns */}
    <div className="absolute inset-0 flex h-full">
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
    <div className="absolute inset-0 h-full">
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
            onDelete={onDeleteTerm}
          />
        ))}
    </div>
  </div>
);
