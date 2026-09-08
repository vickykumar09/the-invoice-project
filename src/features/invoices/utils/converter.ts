import { ValueType } from "@/types/shared";

export function toValueType(
  value: string
): ValueType | null {
  if (value === "fixed" || value === "percentage") {
    return value;
  }

  return null;
}