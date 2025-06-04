import { useDraggable } from "@dnd-kit/core";
import type { Term, SchedulerViewport } from "../../types";
import {
  calculateLeftPosition,
  calculateWidth,
  getStatusColor
} from "../../utils/calendar";
import { format, parse } from "date-fns";

const toDate = (dateString: string) =>
  parse(dateString, "yyyy-MM-dd", new Date());

export const TimeBlock: React.FC<{
  term: Term;
  viewport: SchedulerViewport;
}> = ({ term, viewport }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: term.id,
    data: term
  });

  const startDate = toDate(term.startDate);
  const endDate = toDate(term.endDate);
  const viewportStartDate = toDate(viewport.startDate);

  const termLabel = `${format(startDate, "d.M.yyyy")} - ${format(
    endDate,
    "d.M.yyyy"
  )}`;

  const style = {
    left: calculateLeftPosition(
      startDate,
      viewportStartDate,
      viewport.columnWidth
    ),
    width: calculateWidth(startDate, endDate, viewport.columnWidth),
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`absolute h-[80%] top-[10%] rounded-md cursor-move
        ${getStatusColor(term.status)}`}
      style={style}
      title={termLabel}
    >
      <div className="px-2 truncate">
        {term.code}
        <span className="text-xs ml-2 opacity-75">{termLabel}</span>
      </div>
    </div>
  );
};
