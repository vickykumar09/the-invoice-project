import { InvoiceCustomerData } from "./types/customer";
import { Invoice } from "./types/invoice";

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



// ------ SQLite TABLE Types ------

// For your invoicing app
// I'd use this rule:
// TEXT fields entered by the user → store ""
// Dates, IDs, foreign keys, numbers that may not exist → store null






// InvoiceData          // database/API data
// InvoiceFormValues    // form state
// InvoiceFormField     // field definition
// InvoiceProps         // component props
// InvoiceResult        // operation/query result
// InvoiceParams        // function parameters









// ------ INVOICE DISPATCH ------ //
type InvoiceChildEntity = {
  id: string;
  business_id: string;
  invoice_id: string;
};

type InvoiceMetaEntity = {
  created_at: string;
  updated_at: string;
  is_synced: boolean;
};


export type InvoiceDispatch = 
  InvoiceChildEntity &
  InvoiceMetaEntity & {
  transport_mode:
    | 'road'
    | 'rail'
    | 'air'
    | 'sea'
    | 'courier'
    | 'other'

  transporter_name: string;
  vehicle_number: string;
  transport_document_number: string;
  eway_bill_number: string;

  dispatch_date: string;
  expected_delivery_date: string;

  remarks: string;

  created_at: string;
  updated_at: string;
  is_synced: boolean;
}

export type InvoicePayment = 
  InvoiceChildEntity & 
  InvoiceMetaEntity & {
  paid_on: string;
  amount: number;
  method: PaymentMethods;
  reference_id?: string | null
  notes?: string | null
  status: PaymentStatus
}

export type InvoiceRefund = 
  InvoiceChildEntity & {
}

export type InvoiceCreditNote = 
  InvoiceChildEntity & {
  credit_note_no: string
  reason?: string | null
  subtotal: number
  tax_amount: number
  total: number
  status:
    | 'DRAFT'
    | 'ISSUED'
    | 'VOID'

  created_at: string
}

export type InvoiceCreditNoteItem = 
  InvoiceChildEntity & {
  credit_note_id: number
  invoice_item_id: number
  qty: number
  reason?: string | null
  created_at: string
}

export type InvoiceDebitNote = 
  InvoiceChildEntity & {
}

export type InvoiceDebitNoteItem = 
  InvoiceChildEntity & {
}

export type InvoiceReview = 
  InvoiceChildEntity & {
  rating: number;
  comment: string;
  reviewed_at: string;
}

export type InvoiceActivity = 
  InvoiceChildEntity & {
  type: InvoiceActivityTypes;
  title: string;
  description: string;
  created_at: string;
}


// ------ UI TYPES ------ //
export type InvoiceCardData = Pick<
  Invoice & 
  InvoiceCustomerData,
  | "id"
  | "bill_to_name"
  | "grand_total"
  | "created_at"
  | "status"
>

export type InvoiceHeroProps = Pick<
  Invoice & 
  InvoiceCustomerData,
  | 'bill_to_name'
  | 'invoice_number'
  | 'grand_total'
  | 'created_at'
  | 'status'
>

export type MonthlyAnalyticsCardProps = {
  monthKey: string;
  monthLabel: string;
  totalInvoices: number;
  totalAmount: number;
};