export interface JsonData {
  orders: Array<{
    id: string;
    code: string;
    name: string;
  }>;
  terms: Array<{
    id: string;
    orderId: string;
    code: string;
    startDate: string;
    endDate: string;
    status: "new" | "in-progress" | "completed";
  }>;
}
