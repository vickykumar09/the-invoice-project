import { FormField } from "@/form/types";
import { NewInvoiceItem } from "../../types/item"

export const INVOICE_ITEM_FORM_FIELDS: FormField<NewInvoiceItem>[] = [
  {
    key: 'name',
    label: 'Name',

    type: 'TextInput',
    props: {
      placeholder: 'Enter item name',
    },
    
    constraints: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 60,
    }
  },
  {
    key: 'description',
    label: 'Description',

    type: 'TextInput',
    props: {
      placeholder: 'Enter item description',
    },

    constraints: {
      type: 'string',
      required: false,
      minLength: 0,
      maxLength: 200,
    }
  },
  { 
    key: 'measure_unit_id',
    label: 'Measure Unit',
    
    type: 'StepPicker',
    props: {
      options_key: 'measureUnitOptions'
    },
    
    constraints: {
      type: 'string',
      required: true,
    }
  },
  { 
    key: 'rate',
    label: 'Rate',

    type: 'TextInput',
    props: {
      placeholder: '0.00',
      keyboardType: 'numeric',
    },
    
    constraints: {
      type: 'decimal',
      required: true,
      minLength: 1,
      maxLength: 8,
      minValue: 0.01,
      maxValue: 99999.99,
    }
  },
  {
    key: 'rate_type',
    label: 'Rate Type',


    type: 'Selector',
    props: {
      options: [
        { id: 1, label: 'Inclusive', value: 'inclusive'},
        { id: 2, label: 'Exclusive', value: 'exclusive'},
      ]
    },
    
    constraints: {
      type: 'string',
      required: true,
      allowedValues: ['inclusive', 'exclusive']
    }
  },
  {
    key: 'quantity',
    label: 'Quantity',

    type: 'TextInput',
    props: {
      placeholder: '100',
      keyboardType: 'numeric',
    },
    
    constraints: {
      type: 'decimal',
      required: true,
      minLength: 1,
      maxLength: 8,
      minValue: 0.01,
      maxValue: 99999.99,
    }
  },
] as const;

// Invoice Item Discount Fields
export const INVOICE_ITEM_DISCOUNT_FIELDS: FormField<NewInvoiceItem>[] = [
  {
    key: 'discount_type',
    label: 'Discount Type',

    type: 'Selector',
    props: {
      options: [
        { id: 1, label: 'Percentage', value: 'percentage' },
        { id: 2, label: 'Fixed', value: 'fixed' },
      ]
    },
    constraints: {
      type: 'string',
      required: false,
    }
  },
  { 
    key: 'discount_value',
    label: 'Discount Value',

    type: 'TextInput',
    props: {
      placeholder: '20.00',
    },

    constraints: {
      type: 'decimal',
      required: false,
      minLength: 1,
      maxLength: 8,
      minValue: 0,
    }
    // if discount type  is percentage then min is 0.00 and max is 99.99
    // if discount type  is fixed then 0 ≤ Discount ≤ Amount
  },
]


// Invoice Item Tax Fields
export const INVOICE_ITEM_TAX_FORM_FIELDS: FormField<NewInvoiceItem>[] = [
  { 
    key: 'hsn_sac_code',
    label: 'HSN / SAC Code',

    type: 'TextInput',
    props: {
      placeholder: 'e.g. 99831489',
      keyboardType: 'numeric',
    },

    constraints: {
      type: 'string',
      required: false,
      minLength: 4,
      maxLength: 8,
    }
  },
  { 
    key: 'tax_rate',
    label: 'Tax Rate (GST %)',
        
    type: 'Picker',
    props: {
      options_key: 'taxRateOptions'
    },
    
    constraints: {
      type: 'decimal',
      required: true,
    }
  },
  { 
    key: 'cess_type',
    label: 'CESS Type',

    type: 'Selector',
    props: {
      options: [
        { id: 1, label: 'Percentage', value: 'percentage' },
        { id: 2, label: 'Fixed', value: 'fixed' },
      ] as const
    },

    constraints: {
      type: 'string',
      required: true,
    }
  },
  { 
    key: 'cess_value',
    label: 'CESS Value',

    type: 'TextInput',
    props: {
      placeholder: '0.00',
      keyboardType: 'numeric',
    },

    constraints: {
      type: 'decimal',
      required: true,
    }
  },
] as const;