import { ValueType } from "@/types/shared"

// ------ BASE TYPES ------
export type InvoiceType = 
  | 'none'
  | 'taxable'
  | 'exempt'

export type InvoiceRoundOffMode = 
  | 'none'
  | 'up'
  | 'down'

export type InvoiceStatus =
  | "draft"
  | "issued"
  | "cancelled"

export type InvoicePaymentStatus = 
  | 'unpaid'
  | 'partially_paid'
  | 'paid'

export type InvoiceActivityTypes =
  | 'invoice_created'
  | 'invoice_issued'
  | 'invoice_cancelled'
  | 'payment_received'
  | 'credit_note_issued'
  | 'debit_note_issued'
  | 'refund_processed'
  | 'review_added'
  | 'invoice_downloaded'
  | 'invoice_shared'
  | 'status_changed'

export type PaymentMethods =
  | 'cash'
  | 'upi'
  | 'card'
  | 'bank transfer'
  | 'cheque'
  | 'demand draft'
  | 'voucher'
  | 'credit_note'
  | 'other'

export type PaymentStatus = 
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED'
  | 'CANCELLED'

export type RefundStatus =
  | "pending"
  | "processed"
  | "failed"
  | "cancelled";



// ------ SQLite DB Table Types ------ //
export type Invoice = {
  id: string;
  business_id: string;

  invoice_type: InvoiceType;
  is_igst: boolean;

  invoice_number: string | null;
  invoice_date: string;
  place_of_supply: string;

  sales_channel: string;
  handled_by: string;
  order_id: string | null;
  order_date: string | null;

  subtotal: number;
  
  item_discounts_total: number;

  invoice_discount_type: ValueType;
  invoice_discount_value: number;
  invoice_discount_amount: number;

  round_off_mode: InvoiceRoundOffMode;
  round_off_amount: number;

  grand_total: number;
  paid_total: number;
  
  internal_note: string | null;
  
  status: InvoiceStatus;
  
  payment_status: InvoicePaymentStatus;
  payment_due_date: string | null;

  created_at: string;
  issued_at: string | null;
  cancelled_at: string | null;
  updated_at: string;

  is_synced: boolean;
}

export type InvoiceTax = {
  invoice_id: string;
  taxable_total: number;
  cgst_total: number;
  sgst_total: number;
  igst_total: number;
  cess_total: number;
  
  created_at: string;
  updated_at: string;
  is_synced: boolean;
} 


// ------ Derived Types ------ //
export type InvoiceInfoProps = Pick<
  Invoice,
  | 'invoice_number'
  | 'invoice_date'
  | 'status'
  | 'payment_status'
>;

export type InvoiceDetailsProps = Pick<
  Invoice,
  | 'is_igst'
  | 'place_of_supply'
  | 'sales_channel'
  | 'handled_by'
  | 'order_id'
  | 'order_date'
>;

export type InvoiceDiscountProps = Pick<
  Invoice,
  | 'invoice_discount_type'
  | 'invoice_discount_value'
  | 'invoice_discount_amount'
>;

export type InvoiceRoundOffProps = Pick<
  Invoice,
  | 'round_off_mode'
  | 'round_off_amount'
>

export type InvoiceSummary = Pick<
  Invoice,
  | 'is_igst'
  | 'subtotal'
  | 'item_discounts_total'
  | 'coupon_discount_amount'
  | 'invoice_discount_amount'
  | 'discounts_total'
  | 'taxable_amount'
  | 'cgst_total'
  | 'sgst_total'
  | 'igst_total'
  | 'cess_total'
  | 'tax_total'
  | 'round_off_mode'
  | 'round_off_amount'
  | 'grand_total'
>