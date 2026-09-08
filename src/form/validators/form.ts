import { FormErrors, FormField, FormValues } from "../types";
import { validateField } from "./field";

/**
 * Validates a form data object against an array of field configurations using generic and specific rules.
 * 
 * NOTE: Both Generic Field Validator & Specific Field Validator should run.
 * 
 * @template T - The type of the data object being validated.
 * @param {FormData<T>} data - The form data object containing key-value pairs to validate.
 * @param {FormField<T>[]} fields - An array of field configurations defining the validation rules and specific validators for each key.
 * @returns {FormErrors<T>} An object mapping field keys to their corresponding validation error messages.
 */

export function validateForm<T>(
  data: FormValues<T>,
  fields: FormField<T>[],
): FormErrors<T> {
  const errors: FormErrors<T> = {};

  for (const field of fields) {
    const { key, constraints, validator } = field;
    const value = String(data[key])
    
    let error: string | null = null;

    // 1. Run Generic Field Validator
    error = validateField(value, constraints);

    // 2. Run Specific Field Validator only if generic passed cleanly
    const hasValue = value.trim().length > 0;
    if (!error && hasValue && validator) {
      error = validator(value, data);
    }

    // 3. Assign if an error string was returned
    if (error) {
      errors[key] = error;
    }
  }

  console.log(errors)
  return errors;
}


// // Safely handle null or undefined values to avoid string "null" / "undefined"
    // const rawValue = data[key];
    // const value = rawValue !== undefined && rawValue !== null ? String(rawValue) : "";
