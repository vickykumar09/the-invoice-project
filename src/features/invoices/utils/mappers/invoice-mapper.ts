// features/invoices/mappers/invoice.mapper.ts

import { 
  Invoice,
  InvoiceInfoProps,
  InvoiceDetailsProps,
  InvoiceDiscountProps,
  InvoiceRoundOffProps,
  InvoiceSummary, 
} from "../../types/invoice";

export function mapInvoice(
  invoice: Invoice
): {
  info: InvoiceInfoProps,
  details: InvoiceDetailsProps,
  discount: InvoiceDiscountProps,
  roundoff: InvoiceRoundOffProps
} {
  const { 
    invoice_number,
    invoice_date,
    is_igst,
    place_of_supply,
    sales_channel,
    handled_by,
    order_id,
    order_date,
    invoice_discount_type,
    invoice_discount_value,
    invoice_discount_amount,
    round_off_mode,
    round_off_amount
  } = invoice;
  
  return {
    info: { invoice_number, invoice_date },
    details: { is_igst, place_of_supply, sales_channel, handled_by, order_id, order_date },
    discount: { invoice_discount_type, invoice_discount_value, invoice_discount_amount },
    roundoff: { round_off_mode, round_off_amount }
  }
}

export function mapInvoiceToInfo(invoice: Invoice | NewInvoice): InvoiceInfoProps {
  const { invoice_number, invoice_date } = invoice;
  return {
    invoice_number,
    invoice_date
  };
}

export function mapInvoiceToDetails(invoice: Invoice | NewInvoice): InvoiceDetailsProps {
  const { is_igst, place_of_supply, sales_channel, handled_by, order_id, order_date } = invoice;
  return {
    is_igst,
    place_of_supply,
    sales_channel,
    handled_by,
    order_id,
    order_date,
  };
}

export function mapInvoiceToDiscount(invoice: Invoice): InvoiceDiscountProps {
  const { invoice_discount_type, invoice_discount_value, invoice_discount_amount } = invoice;
  return {
    invoice_discount_type,
    invoice_discount_value,
    invoice_discount_amount,
  }
}

export function mapInvoiceToRoundoff(invoice: Invoice): InvoiceRoundOffProps {
  const { round_off_mode, round_off_amount } = invoice;
  return {
    round_off_mode,
    round_off_amount,
  }
}

export function mapInvoiceToSummary(invoice: Invoice): InvoiceSummary {
  return {
    is_igst: invoice.is_igst,
    subtotal: invoice.subtotal,
    item_discounts_total: invoice.item_discounts_total,
    coupon_discount_amount: invoice.coupon_discount_amount,
    invoice_discount_amount: invoice.invoice_discount_amount,
    discounts_total: invoice.discounts_total,
    cgst_total: invoice.cgst_total,
    sgst_total: invoice.sgst_total,
    igst_total: invoice.igst_total,
    cess_total: invoice.cess_total,
    tax_total: invoice.tax_total,
    round_off_mode: invoice.round_off_mode,
    round_off_amount: invoice.round_off_amount,
    grand_total: invoice.grand_total,
  }
}