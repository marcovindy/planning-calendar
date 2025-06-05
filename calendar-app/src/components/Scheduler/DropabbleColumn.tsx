import { useDroppable } from "@dnd-kit/core";
import { createDimensionStyle } from "@/utils/styles";
import { format } from "date-fns";
import React from "react";

interface DroppableColumnProps {
  day: Date;
  orderId: string;
  onCellClick: (orderId: string, date: Date) => void;
}

export const DroppableColumn: React.FC<DroppableColumnProps> = ({
  day,
  orderId,
  onCellClick
}) => {
  const dateString = format(day, "yyyy-MM-dd");

  const { setNodeRef, isOver } = useDroppable({
    id: `${dateString}-${orderId}`
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("start");
    onCellClick(orderId, day);
  };

  return (
    <div
      onClick={handleClick}
      ref={setNodeRef}
      className={`
        border-r 
        flex-shrink-0 
        h-full 
        cursor-pointer 
        hover:bg-gray-100 
        transition-colors 
        relative 
        pointer-events-auto  
        ${isOver ? "bg-blue-100" : ""}
      `}
      style={createDimensionStyle("columnWidth")}
    />
  );
};
