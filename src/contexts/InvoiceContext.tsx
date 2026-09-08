// /contexts/InvoiceContext.tsx
import { Invoice } from "@/features/invoices/types/invoice";
import { createContext, useContext } from "react";

export type InvoiceContextType = {
  invoice: Invoice & { items_count: number };
  setInvoice: (data: any) => void;
};

// Create Context
export const InvoiceContext = createContext<InvoiceContextType | undefined>(
  undefined,
);

// Custom Hook
export function useInvoice() {
  const context = useContext(InvoiceContext);

  if (!context) {
    throw new Error("useInvoice must be used inside InvoiceProvider");
  }

  return context;
}
