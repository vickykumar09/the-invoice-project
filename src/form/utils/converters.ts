import { FormValues } from "@/form/types";


function toFormValue(value: unknown): string {
  if (value == null) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return "";
    }

    return String(value);
  }

  if (typeof value === "boolean") {
    return String(value);
  }

  throw new Error(
    `Unsupported initial form value: ${typeof value}`
  );
}

// formUtils.ts
export function toFormValues<T extends object>(
  data: T
): FormValues<T> {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      toFormValue(value),
    ])
  ) as FormValues<T>;
}