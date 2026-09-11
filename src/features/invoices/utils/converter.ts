import { ValueType } from "@/types/shared";
import { InvoiceRoundOffMode } from "../types/invoice";

/**
 * 
 * @param value - 
 * @returns 
 */

export function toValueType(
  value: string
): ValueType | null {
  if (value === "fixed" || value === "percentage") return value;

  return null;
}

export function toRoundOffMode(
  value: string
): InvoiceRoundOffMode | null {
  if(value === 'up' || value === 'down') return value;
  
  return null;
}