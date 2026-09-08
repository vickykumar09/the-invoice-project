import { FORMAT_VALIDATORS } from "@/constants/format";
import { FieldConstraints } from "../types";


// Generic Field Validator
export function validateField(
  value: string,
  constraints: FieldConstraints
): string | null {
  const {
    type,
    required,
    exactLength,
    minLength,
    maxLength,
    minValue,
    maxValue,
    allowedValues,
    format 
  } = constraints;
  
  const trimmedValue = value.trim();

  // 1. Handle empty required and optional fields.
  if (trimmedValue.length === 0) {
    return required ? "This field is required." : null;
  }

  // 2. Validate allowed values - For Picker, StepPicker, SegmentSelector 
  if (allowedValues !== undefined && !allowedValues.includes(trimmedValue)) {
    return "Invalid value.";
  }

  // 3. Validate according to value type
  switch (type) {
    case "string": {
      // Validate exact length.
      if (exactLength !== undefined && trimmedValue.length !== exactLength) {
        return `Must be exactly ${exactLength} characters long.`;
      }

      // Validate minimum length.
      if (minLength !== undefined && trimmedValue.length < minLength) {
        return `Must be at least ${minLength} characters long.`;
      }

      // Validate maximum length.
      if (maxLength !== undefined && trimmedValue.length > maxLength) {
        return `Must not exceed ${maxLength} characters.`;
      }

      // Validate string format
      if (format) {
        const formatValidator = FORMAT_VALIDATORS[format];

        if (formatValidator && !formatValidator.regex.test(trimmedValue)) {
          return formatValidator.message;
        }
      }

      break;
    }

    case "integer":
    case "decimal": {
      const number = Number(trimmedValue);

      if (Number.isNaN(number)) {
        return `Enter a valid number.`;
      }

      // Validate integer.
      if (type === "integer" && !Number.isInteger(number)) {
        return "Enter a valid whole number.";
      }

      // Validate minimum value.
      if (minValue !== undefined && number < minValue) {
        return `Must be at least ${minValue}.`;
      }

      // Validate maximum value.
      if (maxValue !== undefined && number > maxValue) {
        return `Must not exceed ${maxValue}.`;
      }

      break;
    } 
  }

  return null;
}