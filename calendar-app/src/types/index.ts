import type { ReactNode } from "react";

export interface Order {
  id: string;
  code: string;
  name: string;
  parentId?: string;
}

export interface Term {
  code: ReactNode;
  id: string;
  orderId: string;
  startDate: Date;
  endDate: Date;
  status: "new" | "in-progress" | "completed";
}

export interface SchedulerViewport {
  startDate: Date;
  endDate: Date;
  columnWidth: number;
  rowHeight: number;
  label: string;
}
