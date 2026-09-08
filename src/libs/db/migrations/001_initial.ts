import type { SQLiteDatabase } from "expo-sqlite";
import { ITEM_SCHEMA } from "../schemas/catalog";
import {
  INVOICE_CUSTOMER_SCHEMA,
  INVOICE_ITEM_SCHEMA,
  INVOICE_SCHEMA,
} from "../schemas/invoice";
import {
  MEASURE_UNIT_SCHEMA,
  PAYMENT_METHOD_SCHEMA,
  PLACE_OF_SUPPLY_SCHEMA,
  TAX_RATE_SCHEMA,
} from "../schemas/master";

export async function migration001(db: SQLiteDatabase) {
  await db.withTransactionAsync(async () => {
    // Master Tables
    await db.execAsync(PLACE_OF_SUPPLY_SCHEMA);
    await db.execAsync(MEASURE_UNIT_SCHEMA);
    await db.execAsync(TAX_RATE_SCHEMA);
    await db.execAsync(PAYMENT_METHOD_SCHEMA);

    // Catalog Tables
    await db.execAsync(ITEM_SCHEMA);

    // Invoice Tables
    await db.execAsync(INVOICE_SCHEMA);
    await db.execAsync(INVOICE_CUSTOMER_SCHEMA);
    await db.execAsync(INVOICE_ITEM_SCHEMA);
  });
}
