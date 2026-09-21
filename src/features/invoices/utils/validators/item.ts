import { InvoiceItem } from "../../types/item";

export type InvoiceItemValidationErrors = Partial<
  Record<keyof InvoiceItem, string>
>

export function validateInvoiceItem(
  invoiceItem: InvoiceItem
) : InvoiceItemValidationErrors {
  const errors: InvoiceItemValidationErrors = {};

  // Required Fields
  if(!invoiceItem.id) {
    errors.id = "Invoice Item ID is required."
  }

  return errors;
}