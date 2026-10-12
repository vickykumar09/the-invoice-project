import { toPaise } from '@/utils/money/convert';
import { InvoiceItemSummaryParams } from '../../types/item';
import { RateType } from '@/features/catalog/types';
import { ValueType } from '@/types/shared';

/**
 * 
 * Tax Exclusive
 *  - Amount = Qty × Rate
 *  - Apply discount.
 *  - Taxable Value = Amount − Discount.
 *  - Calculate GST and CESS.
 *  - Total = Taxable Value + GST + CESS.
 * 
 * Tax Inclusive
 *  - Amount = Qty × Rate (includes tax).
 *  - Convert it to the taxable value first.
 *  - Apply the discount to the taxable value.
 *  - Calculate GST and CESS on the discounted taxable value.
 *  - Total = Taxable Value + GST + CESS. 
 */ 

/**
 * Extracts the tax-exclusive rate from a tax-inclusive rate.
 *
 * @param ratePaise Rate including tax, in paise.
 * @param taxRate GST rate (e.g. 18 for 18%).
 * @param cessRate Cess percentage, if applicable.
 * @returns Tax-exclusive rate in paise.
 */

function calculateInvoiceItemBase(
  quantity: number,
  rate: number,
  rate_type: RateType | null,
  discount_type: ValueType | null,
  discount_value: number,
  tax_rate: number | null,
) {
  // Convert Rate from rupees to Paise
  const originalRatePaise = toPaise(rate);

  // Amount
  const amount = quantity * originalRatePaise;
  
  // Amount Excluding Tax
  const taxRate = tax_rate ?? 0
  const ratePaise =
    rate_type === 'inclusive' && taxRate > 0
      ? Math.round((originalRatePaise * 100) / (100 + taxRate))
      : originalRatePaise;

  const amountExcludingTax = Math.round(quantity * ratePaise);
  
  // Calculate Item Discount Amount
  let itemDiscountAmount = 0;

  switch (discount_type) {
    case 'percentage':
      itemDiscountAmount = Math.round(amountExcludingTax * discount_value / 100)
      break;

    case 'fixed':
      itemDiscountAmount = toPaise(discount_value);
      break;

    default:
      throw new Error(`Unsupported discount type: ${discount_type}`);
  }

  const itemNetAmount = amountExcludingTax - itemDiscountAmount;

  return {
    amount,
    amountExcludingTax,
    itemDiscountAmount,
    itemNetAmount,
  };
}

export function calculateInvoiceItemSummary({
  invoice_type,
  is_igst,
  quantity,
  rate,
  discount_type,
  discount_value,
  rate_type,
  tax_rate,
  cess_type,
  cess_value,
  allocatedInvoiceDiscount
}: InvoiceItemSummaryParams) {
  const {
    amount,
    amountExcludingTax,
    itemDiscountAmount,
    itemNetAmount
  } = calculateInvoiceItemBase(
    quantity,
    rate,
    rate_type,
    discount_type,
    discount_value,
    tax_rate
  )
  
  // Calculate Tax Rates & Tax Amounts
  let taxableAmount = 0;
  let cgstRate = 0, sgstRate = 0, igstRate = 0;
  let cgstAmount = 0, sgstAmount = 0, igstAmount = 0;
  let cessAmount = 0;

  if(invoice_type === 'taxable' && tax_rate && cess_value) {
    taxableAmount = Math.max(0, itemNetAmount - allocatedInvoiceDiscount);
    
    // Calculate Tax Rates & Amounts
    if (is_igst) {
      igstRate = tax_rate;
      igstAmount = Math.round(taxableAmount * tax_rate / 100);
    } else {
      cgstRate = tax_rate / 2;
      sgstRate = tax_rate / 2;
      cgstAmount = Math.round(taxableAmount * tax_rate / 200);
      sgstAmount = Math.round(taxableAmount * tax_rate / 200);
    }

    // Calculate CESS Amount
    switch (cess_type) {
      case 'percentage':
        cessAmount = Math.round(taxableAmount * cess_value / 100);
        break;
  
      case 'fixed':
        cessAmount = toPaise(cess_value);
        break;
  
      default:
        throw new Error(`Unsupported cess type: ${cess_type}`);
    }
  }

  const taxesTotal = cgstAmount + sgstAmount + igstAmount + cessAmount

  // Calculate Total Amount
  let totalAmount = itemNetAmount;
  if (taxableAmount > 0) {
    totalAmount = taxableAmount + taxesTotal
  }

  return {
    rate_type,
    amount,
    amountExcludingTax,
    discount_amount: itemDiscountAmount,
    invoice_discount_amount: '',
    taxable_amount: taxableAmount,
    cgst_rate: cgstRate,
    sgst_rate: sgstRate,
    igst_rate: igstRate,
    cgst_amount: cgstAmount,
    sgst_amount: sgstAmount,
    igst_amount: igstAmount,
    cess_amount: cessAmount,
    total_amount: totalAmount
  };
} 