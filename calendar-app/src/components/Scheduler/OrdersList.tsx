import type { Order } from "../../types";
import {
  FixedSizeList,
  FixedSizeList as List,
  type ListChildComponentProps
} from "react-window";
import { createDimensionStyle } from "@/utils/styles";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import type { ListRef } from "@/types/list";

interface OrdersListProps {
  orders: Order[];
  listRef: React.RefObject<ListRef | null>;
  onScroll: (scrollTop: number) => void;
}

export const OrdersList: React.FC<OrdersListProps> = ({
  orders,
  listRef,
  onScroll
}) => {
  const itemHeight = parseInt(
    createDimensionStyle("rowHeight", "height")?.height?.toString() || "40"
  );

  const Row = React.useCallback(
    ({ index, style }: ListChildComponentProps) => {
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
          ref={listRef}
          height={height}
          width={width}
          itemCount={orders.length}
          itemSize={itemHeight}
          overscanCount={5}
          onScroll={({ scrollOffset }) => onScroll(scrollOffset)}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};
