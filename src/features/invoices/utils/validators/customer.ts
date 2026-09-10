import { InvoiceCustomerData } from "../../types/customer";

export type CustomerValidationErrors = Partial<
  Record<keyof InvoiceCustomerData, string>
>;

export function validateCustomer(
  customer: InvoiceCustomerData,
): CustomerValidationErrors {
  const errors: CustomerValidationErrors = {};

  // Required fields
  if (!customer.invoice_id) {
    errors.invoice_id = "Invoice ID is required.";
  }

  if (!customer.bill_to_name) {
    errors.bill_to_name = "Billing Name is required.";
  }

  if (!customer.bill_to_phone) {
    errors.bill_to_phone = "Billing Phone is required.";
  }

  if (!customer.bill_to_address_line1) {
    errors.bill_to_address_line1 = "Bill To Address Line1 is required.";
  }

  if (!customer.bill_to_city) {
    errors.bill_to_city = "Bill to city is required.";
  }

  if (!customer.bill_to_state_code) {
    errors.bill_to_state_code = "Bill to state code is required.";
  }

  // Generated fields
  if (!customer.created_at) {
    errors.created_at = "Created date is required.";
  }

  if (!customer.updated_at) {
    errors.updated_at = "Updated date is required.";
  }

  // if(!customer.is_synced) {
  //   errors.is_synced = "Error with synced status."
  // }

  return errors;
}
