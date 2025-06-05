import type { JsonData } from "@/types/json";
import outputData from "./data/output.json";
import type { Order, Term } from "@/types";

const data = outputData as JsonData;

export const mockOrders = data.orders as Order[];
export const mockTerms = data.terms as Term[];
