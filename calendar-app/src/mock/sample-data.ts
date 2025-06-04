import type { Order, Term } from "../types";

export const sampleOrders: Order[] = [
  { id: "1", code: "ORD-001", name: "První zakázka" },
  { id: "2", code: "ORD-002", name: "Druhá zakázka" },
  { id: "3", code: "ORD-003", name: "Třetí zakázka" }
];

export const sampleTerms: Term[] = [
  {
    id: "1",
    orderId: "1",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 5),
    status: "new",
    code: undefined
  },
  {
    id: "2",
    orderId: "2",
    startDate: new Date(2024, 0, 3),
    endDate: new Date(2024, 0, 7),
    status: "in-progress",
    code: undefined
  }
];
