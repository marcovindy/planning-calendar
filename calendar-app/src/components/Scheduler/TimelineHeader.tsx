import { format } from "date-fns";
import type { SchedulerViewport } from "../../types";
import { cs } from "date-fns/locale";

interface TimelineHeaderProps {
  viewport: SchedulerViewport;
  days: Date[];
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  viewport,
  days
}) => {
  return (
    <div className="flex border-b sticky top-0 bg-white h-12">
      {days.map((day) => (
        <div
          key={day.toISOString()}
          className="flex-shrink-0 border-r flex items-center justify-center flex-col"
          style={{ width: viewport.columnWidth }}
        >
          <div className="text-xs text-gray-500">
            {format(day, "EEEEEE", { locale: cs })}
          </div>
          <div className="font-medium">{format(day, "d.M")}</div>
        </div>
      ))}
    </div>
  );
};
