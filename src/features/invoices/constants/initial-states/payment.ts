import { businessInfo } from "@/constants/business";
import { InvoicePayment } from "../../types";

export const INITIAL_INVOICE_PAYMENT_STATE: InvoicePayment = {
  id: '',
  invoice_id: '',

  paid_at: new Date().toISOString(),
  amount: 0,
  method: 'cash',
  transaction_reference: null,
  notes: null,
  status: 'PENDING',

  created_at: '',
  updated_at: '',
  is_synced: false,
};