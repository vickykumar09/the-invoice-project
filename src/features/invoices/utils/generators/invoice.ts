import { businessInfo } from "@/constants/business";

type InvoiceCounter = {
  businessId: string;
  year: number;
  month: number;        // e.g. 11 for November
  nextInvoiceNumber: number;
}

export function generateInvoiceNumber(counter: number) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const num = String(counter).padStart(6, '0');

  return `${businessInfo.code}-INV-${year}${month}-${num}`;
}
