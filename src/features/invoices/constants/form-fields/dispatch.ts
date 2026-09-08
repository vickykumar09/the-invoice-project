import { FormField } from "@/form/types";

export const TRANSPORT_FORM_FIELDS: FormField[] = [
  {
    key: "transport_mode",
    label: "Transport Mode",
    placeholder: "Select Transportation Mode",

    component: {
      type: "Picker",
      options: [{ id: 1, label: "Bus", value: "bus" }],
    },
  },
  {
    key: "transporter_name",
    label: "Transporter Name",
    placeholder: "Enter Transporter Name",
  },
  {
    key: "vehicle_number",
    label: "Vehicle Number",
    placeholder: "Enter Vehicle Number",
  },
  {
    key: "reference_number",
    label: "Reference Number",
    placeholder: "Enter Reference Number",
  },
  {
    key: "dispatch_date",
    label: "Dispatch Date",
    placeholder: "Enter Transporter Name",

    component: {
      type: "DatePicker",
    },
  },
  {
    key: "expected_delivery_date",
    label: "Expected Delivery Date",
    placeholder: "Enter Expected Delivery Date",

    component: {
      type: "DatePicker",
      minimumDate: new Date(),
    },
  },
  {
    key: "notes",
    label: "Note",
    placeholder: "Tell something",
  },
];
