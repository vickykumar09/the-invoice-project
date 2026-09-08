import { ValueType } from "@/types/shared";

export type ItemType = 
  | 'product' 
  | 'service'

export type RateType = 
  | 'inclusive'
  | 'exclusive'


// ------ SQLite DB Table Data Types ------//
export type Item = {
  id: string;
  business_id: string;

  // category_id: string | null;
  // image_local_uri: string | null;
  // image_remote_path: string | null;
  // bar_code: string | null;
  // item_code: string | null;
  
  type: ItemType;

  name: string;
  description: string | null;
  measure_unit_id: number;

  rate: number;
  rate_type: RateType | null;
  
  hsn_sac_code: string | null;
  tax_rate: number | null;
  cess_type: ValueType | null;
  cess_value: number | null;

  is_active: boolean;
  created_at: string;
  updated_at: string;
  is_synced: boolean;
}

// ------ DERIVED TYPES ------//
export type ItemForm = Pick<
  Item,
  | 'type'
  | 'name'
  | 'description'
  | 'measure_unit_id'
  | 'rate'
  | 'rate_type'
  | 'hsn_sac_code'
  | 'tax_rate'
  | 'cess_type'
  | 'cess_value'
>

// ------ UI TYPES ------ //
export type ItemCardData = Pick<
  Item,
  | "id" 
  | "name"
>

export type ItemRowData = Pick<
  Item,
  | "id"
  | "type" 
  | "name"
  | "description"
  | "updated_at"
>

export type ViewItem = Item & {
  category_name: string | null;
  category_icon_library?: string | null;
  category_icon_name?: string | null;

  measure_unit_name: string;
  measure_unit_symbol: string;
};


export type ItemCounts = {
  productCount: number;
  serviceCount: number;
};