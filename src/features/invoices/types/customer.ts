export type InvoiceCustomerData = {
  invoice_id: string;
  customer_id: string | null;

  bill_to_name: string;
  bill_to_phone: string;
  bill_to_address_line1: string;
  bill_to_address_line2: string | null;
  bill_to_city: string;
  bill_to_state_code: string;
  bill_to_pincode: string | null;
  bill_to_email: string | null;
  bill_to_gstin: string | null;

  is_shipping_same_as_billing: boolean;

  ship_to_name: string | null;
  ship_to_address_line1: string | null;
  ship_to_address_line2: string | null;
  ship_to_city: string | null;
  ship_to_state_code: string | null;
  ship_to_pincode: string | null;
  ship_to_phone: string | null;
  ship_to_email: string | null;
  ship_to_gstin: string | null;

  created_at: string;
  updated_at: string;
  is_synced: boolean;
};

export type InvoiceCustomerForm = Omit<
  InvoiceCustomerData,
  | "invoice_id"
  | "created_at"
  | "updated_at"
  | "is_synced"
>;

export type InvoiceCustomerDisplay = InvoiceCustomerData & {
  bill_to_state: string;
  ship_to_state: string;
};
