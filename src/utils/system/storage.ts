import { getDB } from "@/libs/db/database";

// Read The SQLite DB Tables with schema
export const readDb = async () => {
  try {
    const db = await getDB();
    const res = await db.getAllAsync(`SELECT * FROM sqlite_master`);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// Get SQLite Tables List
export const getTablesList = async () => {
  const db = await getDB();
  const tables = await db.getAllAsync<{ name: string }>(
    `SELECT name FROM sqlite_master
    WHERE type = 'table'
    ORDER BY name`,
  );

  console.log(tables);
};

// Create a table
export const createTable = async (
  drop: boolean,
  table_name: string,
  table_create_query: string,
) => {
  try {
    const db = await getDB();
    if (drop) {
      await db.runAsync(`
        DROP TABLE IF EXISTS ${table_name};
      `);
    }
    await db.runAsync(table_create_query);
    console.log("success");
  } catch (error) {
    throw error;
  }
};

// Fetch all the data from a particular table
export const fetchTableData = async (table_name: string) => {
  try {
    const db = await getDB();
    const res = await db.getAllAsync(`SELECT * FROM ${table_name}`);

    console.log(table_name);
    console.log(res);
    console.log(res.length);
  } catch (error) {
    console.log(error);
  }
};

export const fetchTableColumnsInfo = async (table_name: string) => {
  try {
    const db = await getDB();
    const columns = await db.getAllAsync(`PRAGMA table_info(${table_name})`);
    console.log(columns);
  } catch (error) {
    console.log(error);
  }
};

/**
| Feature           | What it is                              | Example                                                     | Use case                                   |
| ----------------- | --------------------------------------- | ----------------------------------------------------------- | ------------------------------------------ |
| **Tables**        | Stores actual data in rows & columns    | `CREATE TABLE users (id TEXT, name TEXT);`                  | invoices, items, users, etc.               |
| **Indexes**       | Speeds up queries on columns            | `CREATE INDEX idx_invoice_id ON invoice_items(invoice_id);` | fast filtering/search                      |
| **Triggers**      | Auto-runs logic on INSERT/UPDATE/DELETE | `AFTER INSERT ON invoices ...`                              | auto update timestamps, totals             |
| **Views**         | Virtual table based on a query          | `CREATE VIEW invoice_summary AS SELECT ...`                 | reusable reports / summaries               |
| **System Tables** | SQLite internal metadata tables         | `sqlite_master`, `sqlite_sequence`                          | schema inspection, auto-increment tracking |
 */

/**
 * Use execAsync() mainly for:
 *
 * - schema creation
 * - migrations
 * - bulk SQL scripts
 * - debugging raw SQL
 * - multiple statements at once
 */

// Seed Tax Rates
export const seedTaxRates = async () => {
  try {
    const db = await getDB();
    await db.runAsync(
      `
      INSERT INTO tax_rates
        (code, name, rate, valid_from, valid_to, is_active, created_at, updated_at)
      VALUES
        ('EXEMPT', 'Exempt', -1, '2025-09-22', NULL, 1, '2026-08-18T00:00:00.000Z', '2026-08-18T00:00:00.000Z'),
        ('GST_0',  'GST 0%',  0, '2025-09-22', NULL, 1, '2026-08-18T00:00:00.000Z', '2026-08-18T00:00:00.000Z'),
        ('GST_5',  'GST 5%',  5, '2025-09-22', NULL, 1, '2026-08-18T00:00:00.000Z', '2026-08-18T00:00:00.000Z'),
        ('GST_18', 'GST 18%', 18, '2025-09-22', NULL, 1, '2026-08-18T00:00:00.000Z', '2026-08-18T00:00:00.000Z'),
        ('GST_40', 'GST 40%', 40, '2025-09-22', NULL, 1, '2026-08-18T00:00:00.000Z', '2026-08-18T00:00:00.000Z');
      `,
    );
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

// Seed PLACES OF SUPPLY
export const seedPlacesOfSupply = async () => {
  try {
    const db = await getDB();
    await db.runAsync(
      `
      INSERT OR IGNORE INTO places_of_supply (
        id,
        code,
        name,
        valid_from,
        valid_to,
        is_active,
        created_at,
        updated_at
      )
      VALUES
        ('01', '01', 'Jammu and Kashmir', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('02', '02', 'Himachal Pradesh', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('03', '03', 'Punjab', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('04', '04', 'Chandigarh', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('05', '05', 'Uttarakhand', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('06', '06', 'Haryana', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('07', '07', 'Delhi', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('08', '08', 'Rajasthan', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('09', '09', 'Uttar Pradesh', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('10', '10', 'Bihar', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('11', '11', 'Sikkim', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('12', '12', 'Arunachal Pradesh', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('13', '13', 'Nagaland', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('14', '14', 'Manipur', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('15', '15', 'Mizoram', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('16', '16', 'Tripura', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('17', '17', 'Meghalaya', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('18', '18', 'Assam', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('19', '19', 'West Bengal', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('20', '20', 'Jharkhand', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('21', '21', 'Odisha', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('22', '22', 'Chhattisgarh', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('23', '23', 'Madhya Pradesh', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('24', '24', 'Gujarat', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('25', '25', 'Daman and Diu', '2017-07-01', '2020-05-26', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('26', '26', 'Dadra and Nagar Haveli and Daman and Diu', '2020-05-26', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('27', '27', 'Maharashtra', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('28', '28', 'Andhra Pradesh', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('29', '29', 'Karnataka', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('30', '30', 'Goa', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('31', '31', 'Lakshadweep', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('32', '32', 'Kerala', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('33', '33', 'Tamil Nadu', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('34', '34', 'Puducherry', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('35', '35', 'Andaman and Nicobar Islands', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('36', '36', 'Telangana', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('37', '37', 'Andhra Pradesh', '2017-07-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('38', '38', 'Ladakh', '2019-11-01', NULL, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `,
    );
  } catch (error) {
    console.log(error);
  }
};

// Seed MEASURE UNIT
export const seedMeasureUnits = async () => {
  try {
    const db = await getDB();
    await db.runAsync(
      `
      INSERT OR IGNORE INTO measure_units (
        id,
        parent_id,
        code,
        name,
        symbol,
        description,
        decimal_places,
        is_active,
        created_at,
        updated_at
      )
      VALUES
        -- ============================================================
        -- WEIGHT
        -- ============================================================

        (1, NULL, 'WEIGHT', 'Weight', NULL,
        'Units used to measure mass or weight.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (2, 1, 'KG', 'Kilogram', 'kg',
        'SI unit of mass.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (3, 1, 'G', 'Gram', 'g',
        'Metric unit of mass equal to one thousandth of a kilogram.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (4, 1, 'MG', 'Milligram', 'mg',
        'Metric unit of mass equal to one thousandth of a gram.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (5, 1, 'T', 'Tonne', 't',
        'Metric unit of mass equal to one thousand kilograms.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),


        -- ============================================================
        -- LENGTH
        -- ============================================================

        (10, NULL, 'LENGTH', 'Length', NULL,
        'Units used to measure length or distance.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (11, 10, 'M', 'Metre', 'm',
        'SI unit of length.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (12, 10, 'CM', 'Centimetre', 'cm',
        'Metric unit of length equal to one hundredth of a metre.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (13, 10, 'MM', 'Millimetre', 'mm',
        'Metric unit of length equal to one thousandth of a metre.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (14, 10, 'KM', 'Kilometre', 'km',
        'Metric unit of length equal to one thousand metres.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (15, 10, 'IN', 'Inch', 'in',
        'Imperial and US customary unit of length.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (16, 10, 'FT', 'Foot', 'ft',
        'Imperial and US customary unit of length.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),


        -- ============================================================
        -- VOLUME
        -- ============================================================

        (20, NULL, 'VOLUME', 'Volume', NULL,
        'Units used to measure volume or capacity.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (21, 20, 'L', 'Litre', 'L',
        'Metric unit of volume equal to one cubic decimetre.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (22, 20, 'ML', 'Millilitre', 'mL',
        'Metric unit of volume equal to one thousandth of a litre.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (23, 20, 'M3', 'Cubic metre', 'm³',
        'SI derived unit of volume.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),


        -- ============================================================
        -- AREA
        -- ============================================================

        (30, NULL, 'AREA', 'Area', NULL,
        'Units used to measure surface area.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (31, 30, 'M2', 'Square metre', 'm²',
        'SI derived unit of area.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (32, 30, 'FT2', 'Square foot', 'ft²',
        'Imperial and US customary unit of area.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (33, 30, 'AC', 'Acre', 'acre',
        'Unit of land area commonly used in India and other countries.',
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),


        -- ============================================================
        -- COUNT
        -- ============================================================

        (40, NULL, 'COUNT', 'Count', NULL,
        'Units used to represent discrete quantities.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (41, 40, 'PCS', 'Piece', 'pcs',
        'A single countable item.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (42, 40, 'DOZ', 'Dozen', 'doz',
        'A group of twelve items.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (43, 40, 'PAIR', 'Pair', 'pair',
        'A set of two matching or associated items.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (44, 40, 'SET', 'Set', 'set',
        'A group of items sold or treated as a unit.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),


        -- ============================================================
        -- TIME
        -- ============================================================

        (50, NULL, 'TIME', 'Time', NULL,
        'Units used to measure duration.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (51, 50, 'SEC', 'Second', 's',
        'SI base unit of time.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (52, 50, 'MIN', 'Minute', 'min',
        'Unit of time equal to sixty seconds.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (53, 50, 'HR', 'Hour', 'h',
        'Unit of time equal to sixty minutes.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

        (54, 50, 'DAY', 'Day', 'd',
        'Unit of time equal to twenty-four hours.',
        0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `,
    );
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
// Seed PAYMENT METHODS
