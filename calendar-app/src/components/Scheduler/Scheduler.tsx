import { DndContext } from "@dnd-kit/core";
import { SchedulerGrid } from "./Grid/SchedulerGrid";
import { SchedulerHeader } from "./SchedulerHeader";
import { useScheduler } from "../../hooks/useScheduler";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";
import { dateUtils } from "@/utils/date";
import { AddTermModal } from "../Modals/AddTermModal";
import { AddOrderModal } from "../Modals/AddOrderModal";
import type { Term } from "@/types";
import { EditTermModal } from "../Modals/EditTermModal";

export const Scheduler: React.FC = () => {
  const {
    viewport,
    orders,
    terms,
    handleDragEnd,
    moveViewport,
    updateTerm,
    addOrder,
    addTerm,
    deleteTerm,
    toggleExpand,
    isExpanded
  } = useScheduler();

  const addOrderModal = useModal();
  const addTermModal = useModal();
  const editTermModal = useModal();
  const [selectedCell, setSelectedCell] = useState<{
    orderId: string;
    date: string;
  } | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const handleCellClick = (orderId: string, date: Date) => {
    const dateString = dateUtils.toString(date);
    setSelectedCell({ orderId, date: dateString });
    addTermModal.open();
  };

  const handleEditTerm = (term: Term) => {
    setSelectedTerm(term);
    editTermModal.open();
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
          onEditTerm={handleEditTerm}
          onDeleteTerm={deleteTerm}
          onToggleExpand={toggleExpand}
          isExpanded={isExpanded}
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
              endDate: termData.endDate,
              code: termData.code
            });
          }
          addTermModal.close();
        }}
        initialDate={selectedCell?.date}
      />

      <EditTermModal
        isOpen={editTermModal.isOpen}
        onClose={() => {
          editTermModal.close();
          setSelectedTerm(null);
        }}
        onSubmit={(termId, updates) => {
          updateTerm(termId, updates);
          editTermModal.close();
        }}
        term={selectedTerm}
      />
    </div>
  );
};
