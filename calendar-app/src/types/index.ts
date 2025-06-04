export interface Order {
  id: string;
  code: string;
  name: string;
  parentId?: string;
}

export type Status = "new" | "in-progress" | "completed";

export interface Term {
  id: string;
  orderId: string;
  code: string;
  startDate: string;
  endDate: string;
  status: Status;
}

export interface AddTermData {
  orderId: string;
  startDate: string;
  endDate: string;
  status: Status;
  code: string;
}

export interface SchedulerViewport {
  startDate: string;
  endDate: string;
  columnWidth: number;
  rowHeight: number;
  label: string;
}

export type DateString = string;
