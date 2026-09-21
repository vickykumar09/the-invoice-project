import { businessInfo } from "@/constants/business";
import { InvoiceItem } from "../../types/item";

export const INITIAL_INVOICE_ITEM_STATE: InvoiceItem = {
  id: '',
  business_id: businessInfo.code,
  invoice_id: '',

  name: '',
  description: '',
  quantity: 1,
  measure_unit_id: 0,
  rate: 0,

  discount_type: 'percentage',
  discount_value: 0,
  discount_amount: 0,
  
  tax_rate: 0,
  cgst_amount: 0,
  sgst_amount: 0,
  igst_amount: 0,

  cess_type: 'percentage',
  cess_value: 0,
  cess_amount: 0,

  taxable_amount: 0,        
  total_amount: 0,

  created_at: '',
  updated_at: '',
  is_synced: false,
};