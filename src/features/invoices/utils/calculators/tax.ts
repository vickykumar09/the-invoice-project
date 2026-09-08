type TaxMode = "inclusive" | "exclusive";
type ValueType = "percentage" | "fixed";

interface CalculateItemParams {
  quantity: number;
  rate: number;

  taxMode: TaxMode;
  gstRate: number;

  discountType: ValueType;
  discountValue: number;

  cessType: ValueType;
  cessValue: number;
}

interface CalculateItemResult {
  amount: number;
  taxableValue: number;
  discountAmount: number;
  gstAmount: number;
  cessAmount: number;
  total: number;
}

export function calculateInvoiceItem({
  quantity,
  rate,
  taxMode,
  gstRate,
  discountType,
  discountValue,
  cessType,
  cessValue,
}: CalculateItemParams): CalculateItemResult {
  const amount = quantity * rate;

  // Taxable value before discount
  const taxableBeforeDiscount =
    taxMode === 'exclusive'
      ? amount
      : amount / (1 + gstRate / 100);

  // Discount
  const discountAmount =
    discountType === 'percentage'
      ? taxableBeforeDiscount * discountValue / 100
      : discountValue;

  const taxableValue = taxableBeforeDiscount - discountAmount;

  // GST
  const gstAmount = taxableValue * gstRate / 100;

  // CESS
  const cessAmount =
    cessType === 'percentage'
      ? taxableValue * cessValue / 100
      : cessValue;

  // Total
  const total =
    taxMode === 'exclusive'
      ? taxableValue + gstAmount + cessAmount
      : taxableValue + gstAmount + cessAmount;

  return {
    amount,
    taxableValue,
    discountAmount,
    gstAmount,
    cessAmount,
    total,
  };
}