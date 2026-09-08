import { ItemType } from "../catalog/types";

// ------ MEASURE UNIT CATEGORIES & MEASURE UNITS ------ //
export type MeasureUnitCategory = {
  id: number;
  name: string;
  description: string | null;
  parent_id: number | null;
};

export type MeasureUnit = {
  id: number;
  category_id: number;
  code: string;
  name: string;
  symbol: string;
  decimal_places: number;
  is_active: number;
};


// ------ CATEGORIES ------//
export interface Category {
  id: number;
  name: string;
  parent_id: number | null;
  icon: string;
  type: ItemType;
}

export type CategoryWithCount = 
  Category & 
  {
    count: number 
  }