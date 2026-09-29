import { Item, ItemType } from "@/features/catalog/types";
import { ValueType } from "@/types/shared";
import { Invoice } from "./invoice";

// ------ INVOICE ITEM ------ //
export type InvoiceItem = Pick<
  Item,
  | 'type'
  | 'name'
  | 'description'
  | 'measure_unit_id'
  | 'rate'
  | 'rate_type'
  | 'discount_type'
  | 'discount_value'
  | 'hsn_sac_code'
  | 'tax_rate'
  | 'cess_type'
  | 'cess_value'
> & {
  id: string;
  business_id: string;  
  invoice_id: string;
  item_id: string | null;
  
  quantity: number;
  
  amount: number;
  amount_excluding_tax: number;
  
  discount_amount: number;
  invoice_discount_amount: number;

  total_amount: number;

  // Meta
  created_at: string;
  updated_at: string;
  is_synced: boolean;
}

// ------ INVOICE ITEM TAX------ //
export type InvoiceItemTax = {
  invoice_item_id: string;
  taxable_amount: number;
  cgst_rate: number;
  cgst_amount: number;
  sgst_rate: number;
  sgst_amount: number;
  igst_rate: number;
  igst_amount: number;
  cess_amount: number;
  
  // Meta
  created_at: string;
  updated_at: string;
  is_synced: boolean;
}


export type NewInvoiceItem = Pick<
  InvoiceItem,
  | 'invoice_id'
  | 'item_id'
  | 'name'
  | 'description'
  | 'measure_unit_id'
  | 'quantity'
  | 'rate'
  | 'rate_type'
  | 'discount_type'
  | 'discount_value'
  // | 'hsn_sac_code'
  // | 'tax_rate'
  // | 'cess_type'
  // | 'cess_value'
> & {
  
}


export type InvoiceItemSummaryParams = Pick<
  Invoice,
  | 'invoice_type'
  | 'is_igst'
  | 'subtotal'
  | 'invoice_discount_amount'
> & Pick<
  InvoiceItem,
  | 'quantity'
  | 'rate'
  | 'rate_type'
  | 'discount_type'
  | 'discount_value'
  | 'tax_rate'
  | 'cess_type'
  | 'cess_value'
>