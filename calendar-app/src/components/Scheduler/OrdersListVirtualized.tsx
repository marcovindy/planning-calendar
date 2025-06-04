import type { Order } from "../../types";
import {
  FixedSizeList as List,
  type ListChildComponentProps
} from "react-window";
import { createDimensionStyle } from "@/utils/styles";

interface OrdersListProps {
  orders: Order[];
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const itemHeight = parseInt(
    createDimensionStyle("rowHeight", "height")?.height?.toString() || "40"
  );

  const Row = ({ index, style }: ListChildComponentProps) => {
    const order = orders[index];
    return (
      <div
        style={style}
        key={order.id}
        className="flex items-center border-b p-2"
      >
        <div>
          <div className="font-medium">{order.code}</div>
          <div className="text-sm text-gray-600">{order.name}</div>
        </div>
      </div>
    );
  };

  return (
    <List
      height={600}
      itemCount={orders.length}
      itemSize={itemHeight}
      width="100%"
    >
      {Row}
    </List>
  );
};
