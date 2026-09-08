// features/masters/services/sqlite.ts

import { Option } from "@/form/types";
import { getDB } from "@/libs/db/database";

export type PlaceOfSupply = {
  id: string;
  code: string;
  name: string;
};

export type PickerOption = {
  id: number;
  label: string;
  value: string | number;
};

// Tax rates
export async function getTaxRatePickerOptions(): Promise<Option[]> {
  const db  = await getDB();
  const rows = await db.getAllAsync<Option>(`
    SELECT
      id,
      name AS label,
      rate AS value
    FROM tax_rates
    WHERE is_active = 1
    ORDER BY rate ASC
  `);
  
  return rows.map(({ id, label, value }) => ({
    id: id,
    label: label,
    value: value === null ? '': String(value)
  }));
}

// Places of Supply
export async function getPlaceOfSupplyPickerOptions(): Promise<Option[]> {
  const db  = await getDB();
  return db.getAllAsync<Option>(`
    SELECT
      id,
      name AS label,
      code AS value
    FROM places_of_supply
    WHERE is_active = 1
    ORDER BY name
  `);
}

export async function getPlacesOfSupply(): Promise<PlaceOfSupply[]> {
  try {
    const db  = await getDB();
    const res = await db.getAllAsync<PlaceOfSupply>(
      `
      SELECT
        id,
        code,
        name
      FROM places_of_supply
      WHERE is_active = 1
        AND (valid_to IS NULL OR valid_to >= DATE('now'))
      ORDER BY name;
      `
    );

    return res;
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Measure Units
export async function getMeasureUnitPickerOptions(): Promise<Option[]> {
  const db = await getDB();
  const rows = await db.getAllAsync<Option>(`
    SELECT
      id,
      parent_id,
      name AS label,
      id AS value
    FROM measure_units
    WHERE is_active = 1
    ORDER BY parent_id, label
  `);

  return rows.map(({ id, label, value, parent_id }) => ({
    id: id,
    label: label,
    value: value === null ? '': String(value),
    parent_id: parent_id
  }));
}