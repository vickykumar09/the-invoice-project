/**
 * SQLite schema for catalog items.
 * 
 * Business rules:
 * - An item must be either a product or a service.
 * - Item name is required and must be 2–120 characters.
 * - Rate must be between ₹0.01 and ₹1 crore.
 * - Rate type must be either inclusive or exclusive.
 * - Tax rate may be unspecified or must be between 0% and 100%.
 * - Cess is optional. If specified, its type and value must be provided consistently.
 * - Percentage cess must be between 0% and 100%.
 * - Fixed cess must be zero or greater.
 * - Item name, item code, and barcode must be unique within a business.
 * - Category and Measure Unit must reference valid master records.
 */


export const ITEM_SCHEMA = `
  CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,

    category_id TEXT,
    image_local_uri TEXT,
    image_remote_path TEXT,
    bar_code TEXT,
    item_code TEXT,

    type TEXT NOT NULL
      CHECK (type IN ('product', 'service')),
    name TEXT NOT NULL,
    description TEXT,
    measure_unit_id INTEGER NOT NULL,

    rate INTEGER NOT NULL
      CHECK (rate >= 1 AND rate <= 1000000000),
    rate_type TEXT
      CHECK (rate_type IN ('inclusive', 'exclusive')),

    hsn_sac_code TEXT,
    tax_rate REAL
      CHECK (
        tax_rate = -1
        OR (tax_rate >= 0 AND tax_rate <= 100)
      ),
    cess_type TEXT
      CHECK (cess_type IN ('fixed', 'percentage')),
    cess_value REAL 
      CHECK (
        CASE
          WHEN cess_type IS NULL THEN
            cess_value IS NULL

          WHEN cess_type = 'percentage' THEN
            cess_value IS NOT NULL
            AND cess_value >= 0
            AND cess_value <= 100

          WHEN cess_type = 'fixed' THEN
            cess_value IS NOT NULL
            AND cess_value >= 0

          ELSE 0
        END
      ),

    is_active INTEGER NOT NULL DEFAULT 1
      CHECK (is_active IN (0, 1)),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    is_synced INTEGER NOT NULL DEFAULT 0
      CHECK (is_synced IN (0, 1)),

    UNIQUE(business_id, name),
    UNIQUE(business_id, item_code),
    UNIQUE(business_id, bar_code),

    FOREIGN KEY (category_id)
      REFERENCES categories(id)
      ON DELETE RESTRICT,

    FOREIGN KEY (measure_unit_id)
      REFERENCES measure_units(id)
      ON DELETE RESTRICT
  );
`