/*
 * Defines master/reference tables used throughout the application.
 * These tables store reusable lookup data shared by business entities,
 * such as categories and measure units.
 */

export const MEASURE_UNIT_SCHEMA = `
  CREATE TABLE IF NOT EXISTS measure_units (
    id INTEGER PRIMARY KEY,

    parent_id INTEGER
      REFERENCES measure_units(id)
      ON DELETE RESTRICT,

    code TEXT UNIQUE,
    name TEXT NOT NULL UNIQUE,
    symbol TEXT,
    description TEXT,

    decimal_places INTEGER
      CHECK (decimal_places BETWEEN 0 AND 3),

    is_active INTEGER NOT NULL DEFAULT 1
      CHECK (is_active IN (0, 1)),

    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`;

export const PLACE_OF_SUPPLY_SCHEMA = `
  CREATE TABLE IF NOT EXISTS places_of_supply (
    id TEXT PRIMARY KEY,

    code TEXT NOT NULL,
    name TEXT NOT NULL,

    valid_from TEXT NOT NULL,
    valid_to TEXT,

    is_active INTEGER NOT NULL DEFAULT 1
      CHECK(is_active IN (0,1)),

    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,

    UNIQUE(code),
    UNIQUE(name)
  );
`;

export const TAX_RATE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS tax_rates (
    id INTEGER PRIMARY KEY,

    code TEXT NOT NULL,
    name TEXT NOT NULL,

    rate REAL
      CHECK(rate = -1 OR (rate >= 0 AND rate <= 100)),

    valid_from TEXT NOT NULL,
    valid_to TEXT,

    is_active INTEGER NOT NULL DEFAULT 1
      CHECK(is_active IN (0,1)),

    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,

    CHECK(valid_from GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
    CHECK(
      valid_to IS NULL
      OR valid_to GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'
    ),
    CHECK(valid_to IS NULL OR valid_to >= valid_from),

    UNIQUE(code, valid_from)
  );
`;

export const PAYMENT_METHOD_SCHEMA = `
  CREATE TABLE IF NOT EXISTS payment_methods (
    id TEXT PRIMARY KEY,

    code TEXT NOT NULL,
    name TEXT NOT NULL,

    is_active INTEGER NOT NULL DEFAULT 1
      CHECK(is_active IN (0,1)),

    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,

    UNIQUE(code)
  );
`;

export const CATEGORY_SCHEMA = `
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,

    type TEXT NOT NULL
      CHECK(type IN ('product', 'service')),
    parent_id TEXT,

    name TEXT NOT NULL,
    icon_library TEXT,
    icon_name TEXT,
    description TEXT,

    UNIQUE(business_id, type, parent_id, name),

    CHECK (
      (icon_library IS NULL AND icon_name IS NULL)
      OR
      (icon_library IS NOT NULL AND icon_name IS NOT NULL)
    ),

    FOREIGN KEY (business_id)
      REFERENCES businesses(id)
      ON DELETE CASCADE,

    FOREIGN KEY (parent_id)
      REFERENCES categories(id)
      ON DELETE SET NULL
  );
`
