export type InvoiceDiscountAllocationItem = {
  id: string;
  amount_excluding_tax: number;
  item_discount_amount: number;
};

export type InvoiceDiscountAllocation = {
  item_id: string;
  invoice_discount_amount: number;
};

export function allocateInvoiceDiscount(
  items: InvoiceDiscountAllocationItem[],
  invoice_discount_amount: number
): InvoiceDiscountAllocation[] {
  if (invoice_discount_amount <= 0 || items.length === 0) {
    return items.map((item) => ({
      item_id: item.id,
      invoice_discount_amount: 0,
    }));
  }

  // Amount remaining after the item-level discount.
  const itemsWithRemainingAmount = items.map((item) => ({
    ...item,
    remaining_amount: item.amount_excluding_tax - item.item_discount_amount,
  }));

  // Base used to proportionally allocate the invoice discount.
  const invoice_discount_base =
    itemsWithRemainingAmount.reduce(
      (total, item) => total + item.remaining_amount,
      0
    );

  if (invoice_discount_base <= 0) {
    return items.map((item) => ({
      item_id: item.id,
      invoice_discount_amount: 0,
    }));
  }

  const allocations: InvoiceDiscountAllocation[] = [];
  let allocated_amount = 0;

  itemsWithRemainingAmount.forEach((item, index) => {
    const is_last_item = index === itemsWithRemainingAmount.length - 1;

    let item_discount: number;

    if (is_last_item) {
      // Give the final rounding remainder to the last item.
      item_discount = invoice_discount_amount - allocated_amount;
    } else {
      item_discount = Math.round(
        (item.remaining_amount * invoice_discount_amount) / invoice_discount_base
      );

      allocated_amount += item_discount;
    }

    allocations.push({
      item_id: item.id,
      invoice_discount_amount: item_discount,
    });
  });

  return allocations;
}