import { ItemForm } from "../../types";

export const INITIAL_ITEM_STATE: ItemForm = {
  type: 'product',
  name: '',
  description: '',
  measure_unit_id: '',
  rate: 0,
  rate_type: null,
  hsn_sac_code: null,
  tax_rate: null,
  cess_type: null,
  cess_value: null,
};