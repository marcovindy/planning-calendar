import { DroppableColumn } from "../DropabbleColumn";

export interface DroppableColumnsProps {
  days: Date[];
  orderId: string;
  onCellClick: (orderId: string, date: Date) => void;
}

export const DroppableColumns: React.FC<DroppableColumnsProps> = ({
  days,
  orderId,
  onCellClick
}) => (
  <div className="absolute inset-0 flex pointer-events-none">
    {days.map((day) => (
      <DroppableColumn
        key={day.toISOString()}
        day={day}
        orderId={orderId}
        onCellClick={onCellClick}
      />
    ))}
  </div>
);
