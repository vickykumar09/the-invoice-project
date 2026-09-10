import { toPaise } from '@/utils/money/convert';
import { FormValues } from '@/form/types';
import { InvoiceItemSummaryParams } from '../../types/item';


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

const extractTaxExclusiveRate = (
  ratePaise: number,
  taxRate: number,
): number => {

  if (taxRate <= 0) {
    return ratePaise;
  }

  return Math.round((ratePaise * 100) / (100 + taxRate));
};

export function calculateInvoiceItemSummary({
  is_igst,
  quantity,
  rate,
  rate_type,
  discount_type,
  discount_value,
  tax_rate,
  cess_type,
  cess_value
}: FormValues<InvoiceItemSummaryParams>) {
  // Calculate Tax Exclusive Rate
  const originalRatePaise = toPaise(Number(rate))
  const taxRate = Number(tax_rate)

  const ratePaise =
    rate_type === 'inclusive'
      ? extractTaxExclusiveRate(originalRatePaise, taxRate)
      : originalRatePaise;


  // Calculate Amount : Qty * Rate (Tax Excl.)
  const qty = Number(quantity)
  const amount = Math.round(qty * ratePaise)
  
  // Calculate Discount Amount
  const discount_value_num = Number(discount_value); 
  let discount_amount = 0;

  switch (discount_type) {
    case 'percentage':
      discount_amount = Math.round(amount * discount_value_num / 100)
      break;

    case 'fixed':
      discount_amount = toPaise(discount_value_num);
      break;

    default:
      throw new Error(`Unsupported discount type: ${discount_type}`);
  }

  // Allocate Invoice Discount Amount
  const invoice_discount_amount = 10000
//   Item's allocated invoice discount = ( Item taxable value ÷ Total taxable value of all items ) * Invoice discount amount
  // Allocate Coupon Discount Amount

  // instead of only a running variable, calculate the remaining amount

  // Calculate Taxable Amount : Amount - discount_amount
  const taxable_amount = Math.max(0, amount - discount_amount);
  
  // Calculate Tax Amounts
  let cgst_amount = 0;
  let sgst_amount = 0; 
  let igst_amount = 0;

  if (is_igst) {
    igst_amount = Math.round(taxable_amount * taxRate / 100);
  } else {
    cgst_amount = Math.round(taxable_amount * taxRate / 200);
    sgst_amount = Math.round(taxable_amount * taxRate / 200);
  }

  // Calculate CESS Amount
  const cess_value_num = Number(cess_value);
  let cess_amount = 0;

  switch (cess_type) {
    case 'percentage':
      cess_amount = Math.round(taxable_amount * cess_value_num / 100);
      break;

    case 'fixed':
      cess_amount = toPaise(cess_value_num);
      break;

    default:
      throw new Error(`Unsupported cess type: ${cess_type}`);
  }

  // Calculate Total Amount
  let total_amount = 0;
  if (taxable_amount > 0) {
    total_amount = taxable_amount + cgst_amount + sgst_amount + igst_amount + cess_amount
  }


  return {
    quantity: qty,
    rate: ratePaise,
    amount,
    discount_amount,
    taxable_amount,
    cgst_amount,
    sgst_amount,
    igst_amount,
    cess_amount,
    total_amount,
  };
} 