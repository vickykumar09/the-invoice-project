export const INVOICE_TYPES = [
  {
    key: "none",
    title: "Invoice",
    subtitle: "For sales where GST is not applicable.",
  },
  {
    key: "taxable",
    title: "Tax Invoice",
    subtitle: "For taxable supplies under GST.",
  },
  {
    key: "exempt",
    title: "Bill of Supply",
    subtitle: "For exempt or composition supplies.",
  },
] as const;

export const INVOICE_TYPE_DETAILS = Object.fromEntries(
  INVOICE_TYPES.map((type) => [type.key, type])
) as Record<
  (typeof INVOICE_TYPES)[number]["key"],
  (typeof INVOICE_TYPES)[number]
>;