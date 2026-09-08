import { ValueType } from "@/types/shared";
import { ItemType, RateType } from "../types";

export function toTaxRate(value: string): number | null {
  if (value.trim() === "") return null;

  return Number(value)
}

// To convert string cess type into respective type
export function toCessType(value: string): ValueType | null {
  if (value.trim() === "") return null;

  if (value === "fixed" || value === "percentage") {
    return value;
  }

  throw new Error(`Invalid cess type: ${value}`);
}

export function toNullableNumber(value: string): number | null {
  if (value === "") return null;

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

export function toItemType(value: string): ItemType {

  if (value === "product" || value === "service") {
    return value;
  }

  throw new Error(`Invalid item type: ${value}`);
}


export function toRateType(value: string): RateType | null {
  if(value === '') return null;

  if (value === "inclusive" || value === "exclusive") {
    return value;
  }

  throw new Error(`Invalid rate type: ${value}`);
}
