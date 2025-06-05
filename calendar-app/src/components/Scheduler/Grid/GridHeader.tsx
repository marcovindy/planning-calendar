import { SCHEDULER_CONFIG } from "@/config/scheduler";
import type { SchedulerViewport } from "@/types";
import { HEADER_HEIGHT } from "./SchedulerGrid";
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
        height: HEADER_HEIGHT
      }}
    />
    <div
      style={{
        width: days.length * viewport.columnWidth,
        height: HEADER_HEIGHT
      }}
    >
      <TimelineHeader viewport={viewport} days={days} />
    </div>
  </div>
);