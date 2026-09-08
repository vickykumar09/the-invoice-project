// features/invoices/mappers/invoice.mapper.ts

import { Invoice, InvoiceDiscount, InvoiceInfoProps, InvoiceRoundOff, InvoiceRoundOffMode, InvoiceSummary, NewInvoice } from "../../types/invoice";


export function mapInvoiceToInfo(invoice: Invoice | NewInvoice): InvoiceInfoProps {
  return {
    is_igst: invoice.is_igst,
    invoice_number: invoice.invoice_number,
    invoice_date: invoice.invoice_date,
    place_of_supply: invoice.place_of_supply,
    sales_channel: invoice.sales_channel,
    handled_by: invoice.handled_by,
    order_id: invoice.order_id,
    order_date: invoice.order_date,
  };
}

export function mapInvoiceToDiscount(invoice: Invoice): InvoiceDiscount {
  return {
    invoice_discount_type: invoice.invoice_discount_type,
    invoice_discount_value: invoice.invoice_discount_value,
    invoice_discount_amount: invoice.invoice_discount_amount,
  }
}

export function mapInvoiceToRoundoff(invoice: Invoice): InvoiceRoundOff {
  return {
    round_off_mode: invoice.round_off_mode,
    round_off_amount: invoice.round_off_amount,
  }
}

export function  mapInvoiceToSummary(invoice: Invoice): InvoiceSummary {
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