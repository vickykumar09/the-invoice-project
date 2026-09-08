import { FormField } from "@/form/types";
import { InvoiceCustomerForm } from "../../types/customer";

export const BILLING_FIELDS: FormField<InvoiceCustomerForm>[] = [
  {
    key: "bill_to_name",
    label: "Name",

    type: "TextInput",
    props: {
      placeholder: "Enter Customer Name",
    },

    constraints: {
      type: "string",
      required: true,
      minLength: 2,
      maxLength: 100,
    },
  },
  {
    key: "bill_to_address_line1",
    label: "Address (Line 1)",

    type: "TextInput",
    props: {
      placeholder: "House/Flat No., Building Name",
    },

    constraints: {
      type: "string",
      required: true,
    },
  },
  {
    key: "bill_to_address_line2",
    label: "Address (Line 2)",

    type: "TextInput",
    props: {
      placeholder: "Area, Locality, Landmark (Optional)",
    },

    constraints: {
      type: "string",
      required: false,
    },
  },
  {
    key: "bill_to_city",
    label: "City",

    type: "TextInput",
    props: {
      placeholder: "Enter City",
    },

    constraints: {
      type: "string",
      required: true,
    },
  },
  {
    key: "bill_to_state_code",
    label: "State",

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
    key: "bill_to_pincode",
    label: "Pincode",

    type: "TextInput",
    props: {
      placeholder: "Enter Pincode",
      keyboardType: "numeric",
    },

    constraints: {
      type: "string",
      required: false,
      exactLength: 6,
      maxLength: 6,
      format: "pincode",
    },
  },
  {
    key: "bill_to_phone",
    label: "Phone No.",

    type: "TextInput",
    props: {
      placeholder: "9876543210, 9123456789",
      keyboardType: "numeric",
    },

    constraints: {
      type: "string",
      required: true,
      format: "phone",
    },
  },
  {
    key: "bill_to_email",
    label: "Email",

    type: "TextInput",
    props: {
      placeholder: "e.g. name@example.com",
    },

    constraints: {
      type: "string",
      required: false,
      format: "email",
    },
  },
  {
    key: "bill_to_gstin",
    label: "GSTIN",

    type: "TextInput",
    props: {
      placeholder: "e.g. 27ABCDE1234F1Z5",
    },

    constraints: {
      type: "string",
      required: false,
      exactLength: 15,
      maxLength: 15,
      format: "gstin",
    },
  },
];

export const SHIPPING_SAME_AS_BILLING_FIELD: FormField<InvoiceCustomerForm>[] =
  [
    {
      key: "is_shipping_same_as_billing",
      label: "Same As Billing",

      type: "AppSwitch",
      props: {
        description: "Shipping address same as billing",
      },

      constraints: {
        type: "string",
        required: true,
      },
    },
  ];

export const SHIPPING_FIELDS: FormField<InvoiceCustomerForm>[] = [
  {
    key: "ship_to_name",
    label: "Name",

    type: "TextInput",
    props: {
      placeholder: "Enter Customer Name",
    },

    constraints: {
      type: "string",
      required: true,
      minLength: 2,
      maxLength: 100,
    },
  },
  {
    key: "ship_to_address_line1",
    label: "Address (Line 1)",

    type: "TextInput",
    props: {
      placeholder: "House/Flat No., Building Name",
    },

    constraints: {
      type: "string",
      required: true,
    },
  },
  {
    key: "ship_to_address_line2",
    label: "Address (Line 2)",

    type: "TextInput",
    props: {
      placeholder: "Area, Locality, Landmark (Optional)",
    },

    constraints: {
      type: "string",
      required: false,
    },
  },
  {
    key: "ship_to_city",
    label: "City",

    type: "TextInput",
    props: {
      placeholder: "Enter City",
    },

    constraints: {
      type: "string",
      required: true,
    },
  },
  {
    key: "ship_to_state_code",
    label: "State",

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
    key: "ship_to_pincode",
    label: "Pincode",

    type: "TextInput",
    props: {
      placeholder: "Enter Pincode",
      keyboardType: "numeric",
    },

    constraints: {
      type: "string",
      required: false,
      exactLength: 6,
      maxLength: 6,
      format: "pincode",
    },
  },
  {
    key: "ship_to_phone",
    label: "Phone No.",

    type: "TextInput",
    props: {
      placeholder: "Enter Customer Id",
    },

    constraints: {
      type: "string",
      required: true,
      format: "phone",
    },
  },

  {
    key: "ship_to_email",
    label: "Email",

    type: "TextInput",
    props: {
      placeholder: "Enter Customer Email",
    },

    constraints: {
      type: "string",
      required: false,
      format: "email",
    },
  },
  {
    key: "ship_to_gstin",
    label: "GSTIN",

    type: "TextInput",
    props: {
      placeholder: "Enter Customer Id",
    },

    constraints: {
      type: "string",
      required: false,
      exactLength: 15,
      maxLength: 15,
      format: "gstin",
    },
  },
];
