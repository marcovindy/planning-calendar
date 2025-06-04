import { DndContext } from "@dnd-kit/core";
import { SchedulerGrid } from "./SchedulerGrid";
import { SchedulerHeader } from "./SchedulerHeader";
import { useScheduler } from "../../hooks/useScheduler";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";
import { dateUtils } from "@/utils/date";
import { AddTermModal } from "../Modals/AddTermModal";
import { AddOrderModal } from "../Modals/AddOrderModal";

export const Scheduler: React.FC = () => {
  const {
    viewport,
    orders,
    terms,
    handleDragEnd,
    moveViewport,
    addOrder,
    addTerm
  } = useScheduler();

  const addOrderModal = useModal();
  const addTermModal = useModal();
  const [selectedCell, setSelectedCell] = useState<{
    orderId: string;
    date: string;
  } | null>(null);

  const handleCellClick = (orderId: string, date: Date) => {
    const dateString = dateUtils.toString(date);
    setSelectedCell({ orderId, date: dateString });
    addTermModal.open();
  };

  return (
    <div className="flex flex-col h-full">
      <SchedulerHeader
        viewport={viewport}
        onMove={moveViewport}
        onAddOrder={addOrderModal.open}
      />

      <DndContext onDragEnd={handleDragEnd}>
        <SchedulerGrid
          viewport={viewport}
          orders={orders}
          terms={terms}
          onCellClick={handleCellClick}
        />
      </DndContext>

      <AddOrderModal
        isOpen={addOrderModal.isOpen}
        onClose={addOrderModal.close}
        onSubmit={addOrder}
        existingOrders={orders}
      />

      <AddTermModal
        isOpen={addTermModal.isOpen}
        onClose={() => {
          addTermModal.close();
          setSelectedCell(null);
        }}
        onSubmit={(termData) => {
          if (selectedCell) {
            addTerm({
              ...termData,
              orderId: selectedCell.orderId,
              startDate: selectedCell.date,
              code: termData.code
            });
          }
          addTermModal.close();
        }}
        initialDate={selectedCell?.date}
      />
    </div>
  );
};
