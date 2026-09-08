import { Item, ItemType } from "@/features/catalog/types";
import { ValueType } from "@/types/shared";
import { Invoice } from "./invoice";

// ------ INVOICE ITEM ------ //
export type InvoiceItem = Pick<
  Item,
  | 'name'
  | 'description'
  | 'measure_unit_id'
  | 'rate'
  | 'rate_type'
  | 'hsn_sac_code'
  | 'tax_rate'
  | 'cess_type'
  | 'cess_value'

> & {
  id: string;
  business_id: string;  
  invoice_id: string;
  item_id: string | null;
  
  item_type: ItemType | null;
  quantity: number;
  amount: number;
  
  discount_type: ValueType;
  discount_value: number;
  discount_amount: number;

  invoice_discount_amount: number;
  coupon_discount_amount: number;
  
  taxable_amount: number;

  cgst_amount: number;
  sgst_amount: number;
  igst_amount: number;
  cess_amount: number;

  total_amount: number;

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
  | 'hsn_sac_code'
  | 'tax_rate'
  | 'cess_type'
  | 'cess_value'
> & {
  
}


export type InvoiceItemSummaryParams = Pick<
  Invoice,
  | 'is_igst'
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