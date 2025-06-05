import { useDraggable } from "@dnd-kit/core";
import type { Term, SchedulerViewport } from "../../types";
import {
  calculateLeftPosition,
  calculateWidth,
  getStatusColor,
  isTermTruncated
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
  const viewportEndDate = toDate(viewport.endDate);

  const truncated = isTermTruncated(term, viewport);

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
    width: calculateWidth(
      startDate,
      endDate,
      viewportStartDate,
      viewportEndDate,
      viewport.columnWidth
    ),
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined
  };

  // Dynamicky sestavíme třídy pro zaoblení
  const roundedClasses = [
    truncated.start ? "" : "rounded-l-md",
    truncated.end ? "" : "rounded-r-md"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        absolute h-[80%] top-[10%] cursor-move
        z-50 pointer-events-auto 
        ${roundedClasses}
        ${getStatusColor(term.status)}
      `}
      style={style}
      title={termLabel}
    >
      <div className="px-2 truncate">
        {term.code}
        <span className="text-xs ml-2 opacity-75">{termLabel}</span>
      </div>

      {/* Volitelně můžeme přidat vizuální indikátory oříznutí */}
      {truncated.start && (
        <div className="absolute left-0 top-0 h-full w-1 bg-black bg-opacity-20" />
      )}
      {truncated.end && (
        <div className="absolute right-0 top-0 h-full w-1 bg-black bg-opacity-20" />
      )}
    </div>
  );
};
