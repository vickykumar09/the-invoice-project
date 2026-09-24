import { businessInfo } from "@/constants/business";
import { InvoiceItem } from "../../types/item";

export const INITIAL_INVOICE_ITEM_STATE: InvoiceItem = {
  name: '',
  description: '',
  quantity: 1,
  measure_unit_id: 0,
  rate: 0,

  discount_type: 'percentage',

  cess_type: 'percentage',
};