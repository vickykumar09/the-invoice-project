import { ValueType } from "@/types/shared";
import { Invoice, InvoiceDiscount } from "../../types/invoice";

export type InvoiceValidationErrors = Partial<
  Record<keyof Invoice, string>
>

export function validateInvoice(
  invoice: Partial<Invoice>
): InvoiceValidationErrors {
  const errors: InvoiceValidationErrors = {};

  // Required fields
  if (!invoice.id) {
    errors.id = "Item ID is required.";
  }

  return errors;
}


// cess Value Validator
export const cessValueValidator = (
  type: ValueType,
  value: string
): string | null => {
  const numValue = Number(value)
  switch(type) {
    case 'percentage':
      if(numValue > 100) {
        return 'Cess Percentage can be maximum 100'
      }
      break;
    
    case 'fixed':
      if(numValue < 0) {
        return 'Cess value cannot be negative'
      }
      break;
  }

  return null;
}



export type DiscountValidationErrors = Partial<
  Record<keyof InvoiceDiscount, string>
>;

// Discount Value Validator
export function validateDiscount(
  discount: InvoiceDiscount
): DiscountValidationErrors {
  const errors: DiscountValidationErrors = {};

  const {
    invoice_discount_type,
    invoice_discount_value,
    invoice_discount_amount
  } = discount

  switch (invoice_discount_type) {
    case 'percentage':
      if(invoice_discount_value <= 0) {
        errors.invoice_discount_value = "Discount percentage cannot be less than or equal to 0%.";
      }
      if(invoice_discount_value > 100) {
        errors.invoice_discount_value = "Discount percentage cannot exceed 100%.";
      }
      break;
  
    case 'fixed':
      if(invoice_discount_value > numDiscountBaseAmount) {
        errors.invoice_discount_value = 'Discount cannot exceed the item amount.'
      }
      break;
  }
  
  return errors;
}