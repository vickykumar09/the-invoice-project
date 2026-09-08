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
  | 'overdue'

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



// ------ SQLite DB Table Types ------
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

  // Subtotal
  subtotal: number;
  
  // Discount Details
  item_discounts_total: number;
  
  coupon_id: string | null;
  coupon_code: string | null;
  coupon_discount_type: ValueType;
  coupon_discount_value: number;
  coupon_discount_amount: number;

  invoice_discount_type: ValueType | null;
  invoice_discount_value: number;
  invoice_discount_amount: number;

  discounts_total: number;

  taxable_amount: number;
  
  cgst_total: number;
  sgst_total: number;
  igst_total: number;
  cess_total: number;
  tax_total: number;
  
  round_off_mode: InvoiceRoundOffMode;
  round_off_amount: number;

  grand_total: number;
  paid_total: number;
  
  internal_note: string | null;
  
  status: InvoiceStatus;
  payment_status: InvoicePaymentStatus;

  created_at: string;
  issued_at: string | null;
  cancelled_at: string | null;
  updated_at: string;

  is_synced: boolean;
}


export type InvoiceInfoProps = Pick<
  Invoice,
  | 'is_igst'
  | 'invoice_number'
  | 'invoice_date'
  | 'place_of_supply'
  | 'sales_channel'
  | 'handled_by'
  | 'order_id'
  | 'order_date'
>;

export type InvoiceDiscount = Pick<
  Invoice,
  | 'invoice_discount_type'
  | 'invoice_discount_value'
  | 'invoice_discount_amount'
>;

export type InvoiceRoundOff = Pick<
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