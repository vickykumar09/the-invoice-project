import { FormField } from "@/form/types";
import { InvoicePayment } from "../../types";

export const PAYMENT_FORM_FIELDS: FormField<InvoicePayment>[] = [
  {
    key: "paid_on",
    label: "Payment Date",

    component: {
      type: "DatePicker",
    },

    rules: {
      required: true,
    },
  },
  {
    key: "amount",
    label: "Amount",
    placeholder: "e.g. ₹890",
    icon: "rupee-sign",
    keyboardType: "numeric",

    rules: {
      type: "integer",
      required: true,
      maxLength: 15,
    },
  },
  {
    key: "method",
    label: "Method",
    component: {
      type: "Picker",
      options: PAYMENT_METHODS,
    },

    rules: {
      type: "string",
      required: true,
      allowedValues: PAYMENT_METHODS_VALUES,
    },
  },
  {
    key: "reference_no",
    label: "Reference No.",
    placeholder: "here write checque no., upi transaction id",

    rules: {
      type: "string",
    },
  },
  {
    key: "notes",
    label: "Note",
    placeholder: "write something related to this payment",

    rules: {
      type: "string",
    },
  },
] as const;
