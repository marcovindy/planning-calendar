import { DndContext } from "@dnd-kit/core";
import { SchedulerGrid } from "./SchedulerGrid";
import { SchedulerHeader } from "./SchedulerHeader";
import { useScheduler } from "../../hooks/useScheduler";

export const Scheduler: React.FC = () => {
  const { viewport, orders, terms, handleDragEnd, moveViewport } =
    useScheduler();

  return (
    <div className="flex flex-col h-full">
      <SchedulerHeader viewport={viewport} onMove={moveViewport} />
      <DndContext onDragEnd={handleDragEnd}>
        <SchedulerGrid viewport={viewport} orders={orders} terms={terms} />
      </DndContext>
    </div>
  );
};
