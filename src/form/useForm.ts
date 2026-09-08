import { useState } from "react";
import { FieldKey, FormErrors, FormValues, FieldConstraints } from "./types";
import { toFormValues } from "./utils/converters";
import { validateField } from "./validators/field";

/**
 * Manages the state of a form.
 *
 * Provides, form data, and validation errors, along with
 * helper functions to open the modal with initial data and close it while
 * clearing any validation errors.
 * 
 * NOTE: Only Generic Field Validator should run on onBlur
 *
 * @template T The type of the form data managed by the modal.
 * @param initialData The initial form data used to initialize the modal state.
 * @returns An object containing:
 * - `data` - The current form data.
 * - `errors` - The current form validation errors.
 * - `setData` - Updates the form data.
 * - `setErrors` - Updates the validation errors.
 * - `handleFocus` - Makes the field error gone.
 * - `handleChange` - Sanitize the value and store it.
 * - `handleBlur` - Run the generic validation.
 */

type UseFormReturn<T> = {
  data: FormValues<T>;
  errors: FormErrors<T>;
  setData: React.Dispatch<React.SetStateAction<FormValues<T>>>;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors<T>>>;
  handleFocus: (key: FieldKey<T>) => void;
  handleChange: (key: FieldKey<T>, value: string) => void;
  handleBlur: (key: FieldKey<T>, constraints: FieldConstraints) => void;
};

export const useForm = <T extends object>(
  initialData: T
): UseFormReturn<T> => {
  const [data, setData] = useState<FormValues<T>>(() => toFormValues<T>(initialData));
  const [errors, setErrors] = useState<FormErrors<T>>({});

  // Handle Focus
  const handleFocus = (key: FieldKey<T>) => {
    setErrors(prev => ({ ...prev, [key]: undefined }));
  }

  // Handle Change
  const handleChange = (key: FieldKey<T>, value: string) => {
    // Sanitize values
    setData(prev => ({ ...prev, [key]: value }))
  }

  // Handle Blur
  const handleBlur = (key: FieldKey<T>, constraints: FieldConstraints) => {
    const value = data[key]

    // Generic Field Validator (Only this runs here)
    const error = validateField(value, constraints)
    if (error) {
      setErrors(prev => ({...prev, [key]: error ?? undefined }))
      return;
    }
  }

  return {
    data,
    errors,
    setData,
    setErrors,
    handleChange,
    handleFocus,
    handleBlur,
  };
};