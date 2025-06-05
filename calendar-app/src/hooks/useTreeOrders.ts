import type { Order } from "@/types";
import { useState, useMemo } from "react";

export const useTreeOrders = (initialOrders: Order[]) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const ordersTree = useMemo(() => {
    return initialOrders.reduce((acc, order) => {
      if (!order.parentId) {
        acc[order.id] = {
          ...order,
          children: initialOrders.filter((o) => o.parentId === order.id)
        };
      }
      return acc;
    }, {} as Record<string, Order & { children: Order[] }>);
  }, [initialOrders]);

  const visibleOrders = useMemo(() => {
    const result: Order[] = [];

    const addOrder = (order: Order, level: number = 0) => {
      result.push({ ...order, level });
      if (expandedIds.has(order.id)) {
        ordersTree[order.id]?.children?.forEach((child) =>
          addOrder(child, level + 1)
        );
      }
    };

    Object.values(ordersTree)
      .filter((order) => !order.parentId)
      .forEach((order) => addOrder(order));

    return result;
  }, [ordersTree, expandedIds]);

  const toggleExpand = (orderId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) {
        next.delete(orderId);
      } else {
        next.add(orderId);
      }
      return next;
    });
  };

  return {
    visibleOrders,
    toggleExpand,
    isExpanded: (id: string) => expandedIds.has(id)
  };
};
