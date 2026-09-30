import { toPaise } from "@/utils/money/convert";
import { calculateInvoiceRoundOff } from "./invoiceRoundOff";
import { InvoiceItem } from "../../types/item";
import { Invoice } from "../../types/invoice";

/**
 * 
 * @param invoiceItems
 * @param invoice 
 * @returns 
 */

export function calculateInvoiceSummary (
  invoiceItems: InvoiceItem[],
  invoice: Invoice,
) {
  const {
    is_igst,
    invoice_discount_type,
    invoice_discount_value,
    round_off_mode
  } = invoice
  
  // Subtotal - Sum of item amounts before discounts
  const subtotal = invoiceItems.reduce((sum, item) => sum + (item.amount), 0);

  // Item Discounts
  const item_discounts_total = invoiceItems.reduce((sum, item) => sum + item.discount_amount, 0);

  // Invoice Discount Amount 
  let invoice_discount_amount = 0;

  switch (invoice_discount_type) {
    case 'percentage':
      invoice_discount_amount = Math.round(subtotal * invoice_discount_value / 100)
      break;

    case 'fixed':
      invoice_discount_amount = toPaise(invoice_discount_value);
      break;

    case 'none':
      invoice_discount_amount = 0;
      break;

    default:
      throw new Error(`Unsupported discount type: ${invoice_discount_type}`);
  }
  
  // Total Discount
  const discounts_total = item_discounts_total + invoice_discount_amount

  // Allocate Invoice Discount to Invoice Items


  // Taxable Amount
  const taxable_amount = invoiceItems.reduce((sum, item) => sum + item.taxable_amount, 0);
  
  // Taxes Total
  const cgst_total = invoiceItems.reduce((sum, item) => sum + item.cgst_amount, 0);
  const sgst_total = invoiceItems.reduce((sum, item) => sum + item.sgst_amount, 0);
  const igst_total = invoiceItems.reduce((sum, item) => sum + item.igst_amount, 0);
  const cess_total = invoiceItems.reduce((sum, item) => sum + item.cess_amount, 0);
  
  const tax_total = cgst_total + sgst_total + igst_total + cess_total

  // Pre Round Off Total
  let preRoundTotalPaise = 0
  if (invoiceItems?.length) {
    preRoundTotalPaise = (subtotal - discounts_total) + tax_total
  }

  // Round Off
  const { grandTotalPaise, roundOffAmountPaise } = calculateInvoiceRoundOff(preRoundTotalPaise, round_off_mode);

  return {
    is_igst: is_igst,
    subtotal,

    item_discounts_total,
    invoice_discount_amount,
    discounts_total,

    taxable_amount,

    cgst_total,
    sgst_total,
    igst_total,
    cess_total,
    tax_total,

    round_off_mode: round_off_mode,
    round_off_amount: roundOffAmountPaise,
    preRoundTotalPaise: preRoundTotalPaise,
    grand_total: grandTotalPaise,
  };
}