import type { SQLiteDatabase } from "expo-sqlite";
import { migration001 } from "./001_initial";

const DATABASE_VERSION = 1;

const migrations = [migration001];

export async function runMigrations(db: SQLiteDatabase) {
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version;",
  );

  const currentVersion = result?.user_version ?? 0;

  if (currentVersion >= DATABASE_VERSION) {
    return;
  }

  for (let version = currentVersion; version < DATABASE_VERSION; version++) {
    await migrations[version](db);

    await db.execAsync(`PRAGMA user_version = ${version + 1};`);
  }
}
