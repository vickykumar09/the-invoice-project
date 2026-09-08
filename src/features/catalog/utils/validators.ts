import { Item } from "../types";

export type ItemValidationErrors = Partial<
  Record<keyof Item, string>
>;

export function validateItem(item: Item): ItemValidationErrors {
  const errors: ItemValidationErrors = {};

  // Required fields
  if (!item.id) {
    errors.id = "Item ID is required.";
  }

  if (!item.business_id) {
    errors.business_id = "Business ID is required.";
  }

  if (!item.name.trim()) {
    errors.name = "Item name is required.";
  }

  if (item.type !== "product" && item.type !== "service") {
    errors.type = "Invalid item type.";
  }

  // Numeric values
  if (!Number.isSafeInteger(item.rate) || item.rate < 0) {
    errors.rate = "Invalid rate.";
  }

  if (
    item.tax_rate !== null &&
    item.tax_rate !== -1 &&
    (!Number.isFinite(item.tax_rate) ||
      item.tax_rate < 0 ||
      item.tax_rate > 100)
  ) {
    errors.tax_rate = "Invalid tax rate.";
  }

  // Cess
  if (
    item.cess_type !== null &&
    item.cess_type !== "fixed" &&
    item.cess_type !== "percentage"
  ) {
    errors.cess_type = "Invalid cess type.";
  }

  if (
    item.cess_value !== null &&
    (!Number.isFinite(item.cess_value) ||
      item.cess_value < 0)
  ) {
    errors.cess_value = "Invalid cess value.";
  }

  // Conditional cess rule
  if (item.cess_type === null && item.cess_value !== null) {
    errors.cess_value = "Cess value requires a cess type.";
  }

  if (item.cess_type !== null && item.cess_value === null) {
    errors.cess_value = "Cess value is required.";
  }

  // Generated fields
  if (!item.created_at) {
    errors.created_at = "Created date is required.";
  }

  if (!item.updated_at) {
    errors.updated_at = "Updated date is required.";
  }

  return errors;
}