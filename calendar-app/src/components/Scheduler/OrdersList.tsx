import type { Order } from "../../types";
import {
  FixedSizeList as List,
  type ListChildComponentProps
} from "react-window";
import { createDimensionStyle } from "@/utils/styles";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";

interface OrdersListProps {
  orders: Order[];
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const itemHeight = parseInt(
    createDimensionStyle("rowHeight", "height")?.height?.toString() || "40"
  );

  const Row = React.useMemo(
    () =>
      ({ index, style }: { index: number; style: React.CSSProperties }) => {
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
      },
    [orders]
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          itemCount={orders.length}
          itemSize={itemHeight}
          overscanCount={20}
          initialScrollOffset={0}
          useIsScrolling
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};
