import { normalizeBooleanString } from "@/form/utils/normalize";
import { FormValues } from "@/form/types";
import { InvoiceDiscount, InvoiceInfoFormFields } from "../types/invoice";
import { InvoiceCustomerForm } from "../types/customer";
import { toValueType } from "./converter";

export function toInvoiceInsert(
  data: FormValues<InvoiceInfoFormFields>
): InvoiceInfoFormFields {
  const {
   invoice_date,
   place_of_supply,
   sales_channel,
   handled_by,
   order_id,
   order_date
  } = data
  
  return {
    invoice_date: invoice_date,
    place_of_supply: place_of_supply,
    sales_channel: sales_channel,
    handled_by: handled_by,
    order_id: order_id,
    order_date: order_date
  };
}

export function toInvoiceCustomerInsert(
  data: FormValues<InvoiceCustomerForm>
): InvoiceCustomerForm {
  const res = {
    ...data,
    is_shipping_same_as_billing: normalizeBooleanString(data.is_shipping_same_as_billing)
  }

  return res
}


// Convert the invoice disocunt form values into the database type to be ready for insert
export function toInvoiceDiscountInsert(
  data: FormValues<InvoiceDiscount>
): InvoiceDiscount {
  const {
    invoice_discount_type,
    invoice_discount_value,
    invoice_discount_amount
  } = data

  const res = {
    invoice_discount_type: toValueType(invoice_discount_type),
    invoice_discount_value: Number(invoice_discount_value),
    invoice_discount_amount: Number(invoice_discount_amount)
  }

  return res;
}