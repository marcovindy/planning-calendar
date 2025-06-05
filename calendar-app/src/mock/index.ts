// src/mock/index.ts
import mockData from "./data/output.json";
import type { Order, Term } from "@/types";

interface MockData {
  orders: Order[];
  terms: Term[];
}

const typedMockData = mockData as MockData;

export const sampleOrders = typedMockData.orders;
export const sampleTerms = typedMockData.terms;

// Volitelně můžete přidat validaci
const validateMockData = (data: unknown): data is MockData => {
  const mockData = data as MockData;
  return (
    Array.isArray(mockData.orders) &&
    Array.isArray(mockData.terms) &&
    mockData.orders.every(
      (order) =>
        typeof order.id === "string" &&
        typeof order.code === "string" &&
        typeof order.name === "string"
    ) &&
    mockData.terms.every(
      (term) =>
        typeof term.id === "string" &&
        typeof term.orderId === "string" &&
        typeof term.code === "string" &&
        typeof term.startDate === "string" &&
        typeof term.endDate === "string" &&
        ["new", "in-progress", "completed"].includes(term.status)
    )
  );
};

if (!validateMockData(mockData)) {
  throw new Error("Invalid mock data structure");
}
