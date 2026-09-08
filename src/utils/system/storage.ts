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
    console.log("successs");
  } catch (error) {
    console.log(error);
  }
};

// Seed PLACES OF SUPPLY
// Seed MEASURE UNIT
// Seed PAYMENT METHODS
