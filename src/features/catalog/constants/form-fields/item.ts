import { FormField } from "@/form/types";
import { ItemForm } from "../../types";
import { NewInvoiceItem } from "@/features/invoices/types/item";

export const ITEM_FORM_FIELDS: FormField<ItemForm>[] = [
  {
    key: 'type',
    label: 'Item Type',

    type: 'Selector',
    props: {
      options: [
        { id: 1, label: 'Product', value: 'product' },
        { id: 2, label: 'Service', value: 'service' }
      ]
    },
    
    constraints: {
      type: 'string',
      required: true,
      allowedValues: ['product', 'service']
    }
  },
  { 
    key: "name",
    label: "Name",

    type: 'TextInput',
    props: {
      placeholder: "Enter item name"
    },

    constraints: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 120,
    }
  },
  { 
    key: "description", 
    label: "Description",

    type: 'TextInput',
    props: {
      placeholder: "Enter item description",
    },

    constraints: {
      type: 'string',
      required: false,
      minLength: 0,
      maxLength: 500,
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
      maxLength: 15,
    }
  },
  {
    key: 'rate',
    label: 'Rate',

    type: 'TextInput',
    props: {
      placeholder: 'Enter item rate',
      keyboardType: 'numeric',
    },

    constraints: {
      type: 'decimal',
      required: true,
      minValue: 0.01,
      maxValue: 10000000,
      maxLength: 10
    },

    validator: (value, data) => {
      if (
        data.rate_type === "inclusive" &&
        Number(value) < 1
      ) {
        return "Inclusive rate must be at least ₹1";
      }

      return null;
    },
  },
  {
    key: 'rate_type',
    label: 'Rate Type',

    type: 'Selector',
    props: {
      options: [
        { id: 1, label: 'Inclusive', value: 'inclusive' },
        { id: 2, label: 'Exclusive', value: 'exclusive' },
      ],
      clearable: true
    },
    
    constraints: {
      type: 'string',
      required: false,

      allowedValues: ['', 'inclusive', 'exclusive']
    }
  },
] as const;

// Item Discount Fields
export const ITEM_DISCOUNT_FIELDS: FormField<NewInvoiceItem>[] = [
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

// Item Tax Fields
export const ITEM_TAX_FORM_FIELDS: FormField<ItemForm>[] = [
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
      maxLength: 8
    }
  },
  {
    key: 'tax_rate',
    label: 'Tax Rate',

    type: 'Picker',
    props: {
      options_key: 'taxRateOptions'
    },

    constraints: {
      type: 'string',
      required: false
    }
  },
  {
    key: 'cess_type',
    label: 'Cess Type',

    type: 'Selector',
    props: {
      options: [
        { id: 1, label: 'Percentage', value: 'percentage' },
        { id: 2, label: 'Fixed', value: 'fixed' }
      ],
      clearable: true
    },

    constraints: {
      type: 'string',
      required: false,
      allowedValues: ['', 'percentage', 'fixed']
    }
  },
  {
    key: 'cess_value',
    label: 'Cess Value',

    type: 'TextInput',
    props: {
      placeholder: 'Enter cess value',
      keyboardType: 'numeric'
    },

    constraints: {
      type: 'string',
      required: false
    },
  }
]


// export const catalogFields = [
//   { key: "type", label: "Item Type", placeholder: 'Select Item type', length: 60, component: 'Picker', options: itemTypes },
//   { key: "category", label: "Category", placeholder: 'Select Item type', component: 'Picker', options: categories,  length: 60 },
//   { key: "name", label: "Name", placeholder: "Aashirvaad Aata", length: 60 },
//   { key: "desc", label: "Description", placeholder: "Full Name", length: 500, },
//   { key: "unit", label: "Measure Unit", placeholder: "Father's Name", length: 50, component: 'Picker', options: units },
//   { key: "bar_code", label: "Bar Code", placeholder: "9876543210", length: 10, component: 'camera' },
//   { key: "hsn_sac_code", label: "HSN / SAC Code", placeholder: "e.g. 9876543210", length: 10 },
//   { key: "rfid_code", label: "RFID Code", placeholder: "e.g. 9876543210", length: 10 },
// ]

// export const itemsPricesFields = [
//   { key: 'quantity', label: 'quantity/duration', placeholder: 'hell0', length: 8 },
//   { key: 'is_tax_inclusive', label: 'Is Tax Inclusive', placeholder: 'hell0', length: 8 },
//   { key: 'price', label: 'price', placeholder: 'hell0', length: 8 }, // can be set in item prices
//   { key: 'mrp', label: 'maximum retail Price', placeholder: 'hell0', length: 8 }, // can be set in item prices
//   { key: "unit", label: "Measure Unit", placeholder: "Father's Name", length: 50, component: 'Picker', options: units },
//   { key: 'gst_rate', label: 'GST rate', placeholder: 'hell0', length: 8, component: 'Picker', options: tax_rates },
//   { key: 'pricing_type', label: 'pricing_type', placeholder: 'hell0', length: 8 },
// ]

// export const productStockFields = [
//   { key: 'initial_quantity', label: 'quantity', icon: 'shopping-bag', placeholder: 'hell0', length: 8 },
//   { key: 'unit_cost_price', label: 'Purchase Price', icon: 'rupee', placeholder: '', length: 8 },
//   { key: 'unit_selling_price', label: 'Selling Price', icon: 'rupee', placeholder: '', length: 8 },
//   { key: 'batch_code', label: 'Batch Code', icon: 'shopping-bag', placeholder: '', length: 8 },
//   { key: 'expiry_date', label: 'Expiry Date', icon: 'calendar', placeholder: '', length: 8, component: 'DatePicker', },
//   { key: 'note', label: 'Note', icon: 'calendar', placeholder: '', length: 100 },
// ]


/** NEXT PHASE
 * export const ITEM_IDENTIFICATION_FORM_FIELDS: FormField<ItemForm>[] = [
  
  {
    key: 'bar_code',
    label: 'Bar Code',

    type: 'AppCamera',
    props: {
      cameraMode: 'scan'
    },
    
    constraints: {
      type: 'string',
      required: false,
      minLength: 4,
      maxLength: 15,
      //trim whitespace
    }
  },
  {
    key: 'item_code',
    label: 'Item Code',

    type: 'AppCamera',
    props: {
      cameraMode: 'scan'
    },
    
    constraints: {
      type: 'string',
      required: false,
      maxLength: 15,
    }
  },
] as const;
 */