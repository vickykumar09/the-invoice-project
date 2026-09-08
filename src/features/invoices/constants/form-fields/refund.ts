import { PAYMENT_METHODS } from "@/constants/options/payment-methods";
import { FormField } from "@/form/types";

export const REFUND_FORM_FIELDS: FormField[] = [
  {
    key: 'amount',
    label: 'Amount',
    required: true,
    placeholder: 'e.g. ₹890',
    icon: 'rupee-sign',
    keyboardType: 'numeric',
    maxLength: 15
  },
  {
    key: 'method',
    label: 'Method',
    required: true,
    component: 'Picker',
    options: PAYMENT_METHODS,
  },
  { 
    key: 'reference_no',
    label: 'Reference No.',
    placeholder: 'here write checque no., upi transaction id' 
  },
  { 
    key: 'reason',
    label: 'Reason',
    placeholder: 'here write checque no., upi transaction id' 
  },
  { 
    key: 'notes',
    label: 'Note',
    placeholder: 'write something related to this payment'
  },
] as const;

