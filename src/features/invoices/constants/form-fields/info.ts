import {
  PURCHASE_TYPES,
  PURCHASE_TYPES_VALUES,
} from "@/features/invoices/constants/options/purchase-types";
import { FormField } from "@/form/types";
import { InvoiceInfoProps } from "../../types/invoice";

export const INVOICE_INFO_FIELDS: FormField<InvoiceInfoProps>[] = [
  {
    key: "invoice_date",
    label: "Invoice Date",

    type: "DatePicker",
    props: {
      minimumDate: new Date(2000, 0, 1),
      maximumDate: new Date(),
    },

    constraints: {
      type: "string",
      required: true,
    },
  },
  {
    key: "place_of_supply",
    label: "Place of Supply",

    type: "Picker",
    props: {
      options_key: "placeOfSupplyOptions",
    },

    constraints: {
      type: "string",
      required: true,
    },
  },
  {
    key: "sales_channel",
    label: "Sales Channel",

    type: "Picker",
    props: {
      options: PURCHASE_TYPES,
    },

    constraints: {
      type: "string",
      required: true,
      allowedValues: PURCHASE_TYPES_VALUES,
    },
  },
  {
    key: "handled_by",
    label: "Handled By",

    type: "TextInput",
    props: {
      placeholder: "none",
    },

    constraints: {
      type: "string",
      required: true,
    },
  },
  {
    key: "order_id",
    label: "Order Id",

    type: "TextInput",
    props: {
      placeholder: "100",
      keyboardType: "numeric",
    },

    constraints: {
      type: "string",
      required: false,
      minLength: 1,
      maxLength: 8,
      minValue: 0.01,
      maxValue: 99999.99,
    },
  },
  {
    key: "order_date",
    label: "Order Date",

    type: "DatePicker",
    props: {
      minimumDate: new Date(2000, 0, 1),
      maximumDate: new Date(),
    },

    constraints: {
      type: "string",
      required: false,
    },
  },
] as const;

export const INVOICE_INFO_GUIDELINES = [
  "The invoice date must be today or an earlier date.",
  "The place of supply refers to the state/UT where the supply is considered to take place for GST purposes and determines the applicable GST treatment and tax type.",
  "The sales channel refers to the platform or method through which the sale was made, such as in-store, online, or marketplace.",
  "The handled by field identifies the person who handled or processed the order.",
  "The order ID identifies the order associated with the invoice.",
  "The order date specifies when the order was placed.",
];
