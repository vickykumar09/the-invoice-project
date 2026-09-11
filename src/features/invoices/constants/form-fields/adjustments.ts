import { FormField } from "@/form/types";
import { InvoiceDiscount, InvoiceRoundOff } from "../../types/invoice";
import { ROUND_OFF_MODES } from "../options/round-off-modes";

export const INVOICE_DISCOUNT_FIELDS: FormField<InvoiceDiscount>[] = [
  { 
    key: 'invoice_discount_type',
    label: 'Discount Type',

    type: 'Selector',
    props: {
      options: [
        { id: 1, label: 'Percentage', value: 'percentage' },
        { id: 2, label: 'Fixed', value: 'fixed'}
      ]
    },

    constraints: {
      type: 'string',
      required: true,
      allowedValues: ['percentage', 'fixed']
    }
  },
  { 
    key: 'invoice_discount_value',
    label: 'Discount Value',

    type: 'TextInput',
    props: {
      placeholder: '20.00',
      keyboardType: 'numeric',
    },

    constraints: {
      type: 'decimal',
      required: true,
      minLength: 1,
      maxLength: 8,
    }
    // if discount type is percentage then min is 0.00 and max is 99.99
    // if discount type is fixed then 0 ≤ Discount ≤ Amount
  },

]

export const INVOICE_ROUND_OFF_FIELDS: FormField<InvoiceRoundOff>[] = [
  { 
    key: 'round_off_mode',
    label: 'Mode',

    type: 'Selector',
    props: {
      options: ROUND_OFF_MODES
    },

    constraints: {
      type: 'string',
      required: true
    }
  }
]