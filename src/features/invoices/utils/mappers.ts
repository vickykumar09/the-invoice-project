import { normalizeBooleanString } from "@/form/utils/normalize";
import { FormValues } from "@/form/types";
import { InvoiceDiscount, InvoiceInfoProps,  } from "../types/invoice";
import { InvoiceCustomerForm } from "../types/customer";
import { toValueType } from "./converter";

export function toInvoiceInsert(
  data: FormValues<InvoiceInfoProps>
): InvoiceInfoProps {
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
  const isShippingSame = normalizeBooleanString(
    data.is_shipping_same_as_billing
  );

  return {
    ...data,
    is_shipping_same_as_billing: isShippingSame,

    ...(isShippingSame && {
      ship_to_name: null,
      ship_to_address_line1: null,
      ship_to_address_line2: null,
      ship_to_city: null,
      ship_to_state_code: null,
      ship_to_pincode: null,
      ship_to_phone: null,
      ship_to_email: null,
      ship_to_gstin: null,
    }),
  };
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