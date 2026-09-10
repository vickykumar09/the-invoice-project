import { ValueType } from "@/types/shared";

/**
 * 
 * @param value - 
 * @returns 
 */

export function toValueType(
  value: string
): ValueType | null {
  if (value === "fixed" || value === "percentage") {
    return value;
  }

  return null;
}