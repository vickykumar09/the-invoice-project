import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";

/**
 * Returns a singleton instance of the SQLite database.
 * Prevents race conditions and ensures foreign keys + WAL mode are enabled.
 */

let db: SQLiteDatabase | null = null;
let initializing: Promise<SQLiteDatabase> | null = null;

export const getDB = async (): Promise<SQLiteDatabase> => {
  try {
    // Already initialized → return
    if (db) return db;

    // Initialization already in progress → wait for it
    if (initializing) return initializing;

    // Start initialization
    initializing = (async () => {
      const connection = await openDatabaseAsync("app.db", {
        useNewConnection: true, // prevent Expo internal pooling issues
      });

      console.log("[SQLite] Connected → app.db");

      // Enable WAL (Write-Ahead Logging) for massive performance + safety improvement
      await connection.execAsync("PRAGMA journal_mode = WAL;");
      console.log("[SQLite] WAL mode enabled");

      // Enforce foreign key constraints
      await connection.execAsync("PRAGMA foreign_keys = ON;");
      console.log("[SQLite] Foreign keys enabled");

      // Assign singleton
      db = connection;
      initializing = null;

      return connection;
    })();

    return initializing;
  } catch (error) {
    console.error("[SQLite] Failed to initialize database:", error);
    throw error;
  }
};
