import { SCHEDULER_CONFIG } from "@/config/scheduler";
import type { SchedulerViewport } from "@/types";
import { TimelineHeader } from "../TimelineHeader";

interface GridHeaderProps {
  days: Date[];
  viewport: SchedulerViewport;
}

export const GridHeader: React.FC<GridHeaderProps> = ({ days, viewport }) => (
  <div className="sticky top-0 z-30 bg-white flex">
    <div
      className="sticky left-0 z-30 bg-white border-r border-b flex-shrink-0"
      style={{
        width: SCHEDULER_CONFIG.dimensions.leftColumnWidth,
        height: SCHEDULER_CONFIG.dimensions.headerHeight
      }}
    />
    <div
      style={{
        width: days.length * viewport.columnWidth,
        height: SCHEDULER_CONFIG.dimensions.headerHeight
      }}
    >
      <TimelineHeader viewport={viewport} days={days} />
    </div>
  </div>
);
