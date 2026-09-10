import { InvoiceCustomerForm } from "../../types/customer";

export const INITIAL_INVOICE_CUSTOMER_STATE: InvoiceCustomerForm = {
  customer_id: null,

  bill_to_name: '',
  bill_to_phone: '',
  bill_to_address_line1: '',
  bill_to_address_line2: '',
  bill_to_city: '',
  bill_to_state_code: '',
  bill_to_pincode: null,
  bill_to_email: null,
  bill_to_gstin: null,

  is_shipping_same_as_billing: true,

  ship_to_name: null,
  ship_to_address_line1: null,
  ship_to_address_line2: null,
  ship_to_city: null,
  ship_to_state_code: null,
  ship_to_pincode: null,
  ship_to_phone: null,
  ship_to_email: null,
  ship_to_gstin: null, 
}