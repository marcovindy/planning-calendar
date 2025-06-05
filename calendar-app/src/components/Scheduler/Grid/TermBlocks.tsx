import type { SchedulerViewport, Term } from "@/types";
import { isTermInViewport } from "@/utils/date";
import { TimeBlock } from "../TimeBlock";

export const TermBlocks: React.FC<{
  terms: Term[];
  orderId: string;
  viewport: SchedulerViewport;
  onEditTerm: (term: Term) => void;
}> = ({ terms, orderId, viewport, onEditTerm }) => (
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
        />
      ))}
  </div>
);
