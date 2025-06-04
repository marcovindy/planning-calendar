import type { Order } from "../../types";
import { getHeightStyle } from "@/utils/styles";

interface OrdersListProps {
  orders: Order[];
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return (
    <div className="divide-y">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center border-b p-2"
          style={getHeightStyle("rowHeight")}
        >
          <div>
            <div className="font-medium">{order.code}</div>
            <div className="text-sm text-gray-600">{order.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
