import { useDraggable } from "@dnd-kit/core";
import type { Term, SchedulerViewport } from "../../types";
import {
  calculateLeftPosition,
  calculateWidth,
  getStatusColor,
  isTermTruncated
} from "../../utils/calendar";
import { format, parse } from "date-fns";
import { dateUtils } from "@/utils/date";

export interface TimeBlockProps {
  term: Term;
  viewport: SchedulerViewport;
  onEdit: (term: Term) => void;
  onDelete: (termId: string) => void;
}

export const TimeBlock: React.FC<TimeBlockProps> = ({
  term,
  viewport,
  onEdit,
  onDelete
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: term.id,
    data: term
  });

  const startDate = dateUtils.toDate(term.startDate);
  const endDate = dateUtils.toDate(term.endDate);
  const viewportStartDate = dateUtils.toDate(viewport.startDate);
  const viewportEndDate = dateUtils.toDate(viewport.endDate);

  const truncated = isTermTruncated(term, viewport);

  const termLabel = `${format(startDate, "d.M.yyyy")} - ${format(
    endDate,
    "d.M.yyyy"
  )}`;

  const blockHeight = Math.floor(viewport.rowHeight * 0.8);
  const topOffset = Math.floor((viewport.rowHeight - blockHeight) / 2);

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
    height: `${blockHeight}px`,
    top: `${topOffset}px`,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined
  };

  const roundedClasses = [
    truncated.start ? "" : "rounded-l-md",
    truncated.end ? "" : "rounded-r-md"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        absolute
        z-50 pointer-events-auto 
        ${roundedClasses}
        ${getStatusColor(term.status)}
        group
      `}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(term.id);
        }}
        className="absolute -top-2 -right-2 w-5 h-5 bg-red-400 rounded-full text-white 
                   flex items-center justify-center opacity-0 group-hover:opacity-100 
                   transition-opacity z-30 hover:bg-red-500 cursor-pointer"
      >
        ×
      </button>
      <div
        {...attributes}
        {...listeners}
        className="absolute top-0 bottom-0 w-8 cursor-grab active:cursor-grabbing hover:bg-black/5 z-20 flex items-center justify-center"
      >
        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-60">
          <div className="w-1 h-1 bg-current rounded-full" />
          <div className="w-1 h-1 bg-current rounded-full" />
          <div className="w-1 h-1 bg-current rounded-full" />
        </div>
      </div>

      <div
        {...attributes}
        {...listeners}
        className="absolute top-0 bottom-0 w-8 right-0 cursor-grab active:cursor-grabbing hover:bg-black/5 z-20 flex items-center justify-center"
      >
        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-60">
          <div className="w-1 h-1 bg-current rounded-full" />
          <div className="w-1 h-1 bg-current rounded-full" />
          <div className="w-1 h-1 bg-current rounded-full" />
        </div>
      </div>

      {/* Clickable content */}
      <div
        className="absolute inset-x-8 inset-y-0 px-2 z-10 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onEdit(term);
        }}
      >
        <div className="truncate flex items-center h-full">
          <span>{term.code}</span>
          <span className="text-xs ml-2 opacity-75">{termLabel}</span>
        </div>
      </div>

      {truncated.start && (
        <div className="absolute left-0 top-0 h-full w-1 bg-black bg-opacity-20" />
      )}
      {truncated.end && (
        <div className="absolute right-0 top-0 h-full w-1 bg-black bg-opacity-20" />
      )}
    </div>
  );
};
