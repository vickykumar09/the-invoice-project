import { FormField } from "@/form/types";
import { InvoicePayment } from "../../types";

export const PAYMENT_FORM_FIELDS: FormField<InvoicePayment>[] = [
  {
    key: "paid_at",
    label: "Payment Date",

    type: "DatePicker",
    props: {
      minimumDate: new Date(),
      maximumDate: new Date(),
    },

    constraints: {
      type: "string",
      required: true,
    },
  },
  {
    key: "amount",
    label: "Amount",

    type: "TextInput",
    props: {
      placeholder: "e.g. ₹890",
      keyboardType: "numeric",
    },

    constraints: {
      type: "integer",
      required: true,
      maxLength: 15,
    },
  },
  // {
  //   key: "method",
  //   label: "Method",

  //   type: "Picker"
  //   props: {
  //     options: []
  //   },

  //   constraints: {
  //     type: "string",
  //     required: true,
  //     allowedValues: PAYMENT_METHODS_VALUES,
  //   },
  // },
  {
    key: "transaction_reference",
    label: "Reference No.",

    type: 'TextInput',
    props: {
      placeholder: "here write checque no., upi transaction id",
    },

    constraints: {
      type: "string",
      required: false
    },
  },
  {
    key: "notes",
    label: "Note",

    type: 'TextInput',
    props: {
      placeholder: "write something related to this payment",
    },

    constraints: {
      type: "string",
      required: false
    },
  },
] as const;
