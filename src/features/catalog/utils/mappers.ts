import { toPaise } from "@/utils/money/convert";
import { toCessType, toItemType, toNullableNumber, toRateType, toTaxRate } from "./converters";
import { ItemForm } from "../types";
import { FormValues } from "@/form/types";
import { normalizeOptionalString } from "@/form/utils/normalize";

export function toItemInsert(
  data: FormValues<ItemForm>
): ItemForm {
  const {
    type,
    name,
    description,
    measure_unit_id,
    rate,
    rate_type,
    hsn_sac_code,
    tax_rate,
    cess_type,
    cess_value
  } = data
  
  return {
    type: toItemType(type),
    name: name,
    description: normalizeOptionalString(description),
    measure_unit_id: Number(measure_unit_id),
    rate: toPaise(rate),
    rate_type: toRateType(rate_type),
    hsn_sac_code: hsn_sac_code === "" ? null : hsn_sac_code,
    tax_rate: toTaxRate(tax_rate),
    cess_type: toCessType(cess_type),
    cess_value: toNullableNumber(cess_value),
  };
}