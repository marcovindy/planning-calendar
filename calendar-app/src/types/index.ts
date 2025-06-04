import type { ReactNode } from "react";

export interface Order {
  id: string;
  code: string;
  name: string;
  parentId?: string;
}

export interface Term {
  id: string;
  orderId: string;
  code: string;
  startDate: string;
  endDate: string;
  status: "new" | "in-progress" | "completed";
}

export interface SchedulerViewport {
  startDate: string;
  endDate: string;
  columnWidth: number;
  rowHeight: number;
  label: string;
}

export type DateString = string;
