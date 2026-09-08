import { businessInfo } from "@/constants/business";
import { InvoicePayment } from "../../types";

export const INITIAL_INVOICE_PAYMENT_STATE: InvoicePayment = {
  id: '',
  business_id: businessInfo.code,
  invoice_id: '',

  paid_on: new Date().toISOString(),
  amount: 0,
  method: 'cash',
  reference_id: null,
  notes: null,
  status: 'PENDING',

  created_at: '',
  updated_at: '',
  is_synced: false,
};