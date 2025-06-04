import type { Order, Term } from "../types";

export const sampleOrders: Order[] = [
  {
    id: "1",
    code: "E123",
    name: "Frontend Development"
  },
  {
    id: "2",
    code: "E124",
    name: "Backend Integration"
  },
  {
    id: "3",
    code: "E125",
    name: "UI Design"
  },
  {
    id: "4",
    code: "E126",
    name: "Testing"
  }
];

export const sampleTerms: Term[] = [
  {
    id: "t1",
    orderId: "1",
    code: "T1",
    startDate: "2025-06-04",
    endDate: "2025-06-07",
    status: "new"
  },
  {
    id: "t2",
    orderId: "1",
    code: "T2",
    startDate: "2025-06-10",
    endDate: "2025-06-14",
    status: "in-progress"
  },
  {
    id: "t3",
    orderId: "2",
    code: "T3",
    startDate: "2025-06-05",
    endDate: "2025-06-10",
    status: "in-progress"
  },
  {
    id: "t4",
    orderId: "2",
    code: "T4",
    startDate: "2025-06-15",
    endDate: "2025-06-20",
    status: "new"
  },
  {
    id: "t5",
    orderId: "3",
    code: "T5",
    startDate: "2025-06-08",
    endDate: "2025-06-12",
    status: "completed"
  },
  {
    id: "t6",
    orderId: "4",
    code: "T6",
    startDate: "2025-06-06",
    endDate: "2025-06-09",
    status: "new"
  }
];
