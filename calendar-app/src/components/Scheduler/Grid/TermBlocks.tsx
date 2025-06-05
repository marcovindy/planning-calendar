import type { SchedulerViewport, Term } from "@/types";
import { isTermInViewport } from "@/utils/date";
import { TimeBlock } from "../TimeBlock";

export interface TermBlocksProps {
  terms: Term[];
  orderId: string;
  viewport: SchedulerViewport;
  onEditTerm: (term: Term) => void;
  onDeleteTerm: (termId: string) => void;
}

export const TermBlocks: React.FC<TermBlocksProps> = ({
  terms,
  orderId,
  viewport,
  onEditTerm,
  onDeleteTerm
}) => (
  <div className="absolute inset-0 pointer-events-none">
    {terms
      .filter(
        (term) => term.orderId === orderId && isTermInViewport(term, viewport)
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
);
