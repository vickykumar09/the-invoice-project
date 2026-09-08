import * as Crypto from "expo-crypto";
import { Directory, File, Paths } from "expo-file-system";

// ============================================================
// ROOT DIRECTORIES
// ============================================================

export const APP_DIR = new Directory(Paths.document, "myapp");

export const DATA_DIR = new Directory(APP_DIR, "data");
export const IMAGES_DIR = new Directory(APP_DIR, "images");
export const DB_DIR = new Directory(APP_DIR, "db");
export const EXPORTS_DIR = new Directory(APP_DIR, "exports");

// ============================================================
// DIRECTORY MANAGEMENT
// ============================================================

export function ensureDirExists(dir: Directory) {
  if (!dir.exists) {
    dir.create({
      idempotent: true,
      intermediates: true,
    });
  }
}

export function ensureAppDirs() {
  ensureDirExists(APP_DIR);
  ensureDirExists(DATA_DIR);
  ensureDirExists(IMAGES_DIR);
  ensureDirExists(DB_DIR);
  ensureDirExists(EXPORTS_DIR);
}

// ============================================================
// LIST FILES
// ============================================================

export function listFiles(dir: Directory) {
  ensureDirExists(dir);

  return dir.list();
}

export function listAllFiles() {
  ensureAppDirs();

  const files = APP_DIR.list();

  console.log(
    files.map((item) => ({
      name: item.name,
      uri: item.uri,
      type: item instanceof Directory ? "directory" : "file",
    })),
  );

  return files;
}

// ============================================================
// JSON OPERATIONS
// ============================================================

export function writeJson(
  fileName: string,
  data: unknown,
  dir: Directory = DATA_DIR,
) {
  ensureDirExists(dir);

  const file = new File(dir, fileName);

  file.write(JSON.stringify(data));

  return file.uri;
}

export function readJson<T>(
  fileName: string,
  dir: Directory = DATA_DIR,
): T | null {
  const file = new File(dir, fileName);

  if (!file.exists) {
    return null;
  }

  return JSON.parse(file.textSync()) as T;
}

// ============================================================
// FILE OPERATIONS
// ============================================================

export function deleteFile(fileName: string, dir: Directory = DATA_DIR) {
  const file = new File(dir, fileName);

  if (file.exists) {
    file.delete();
  }
}

export function moveFile(
  fileName: string,
  fromDir: Directory,
  toDir: Directory,
) {
  ensureDirExists(toDir);

  const file = new File(fromDir, fileName);

  file.move(toDir);

  return new File(toDir, fileName).uri;
}

export function copyFile(
  fileName: string,
  fromDir: Directory,
  toDir: Directory,
) {
  ensureDirExists(toDir);

  const file = new File(fromDir, fileName);
  const destination = new File(toDir, fileName);

  file.copy(destination);

  return destination.uri;
}

// ============================================================
// FILE EXISTENCE
// ============================================================

export function fileExists(fileName: string, dir: Directory = DATA_DIR) {
  const file = new File(dir, fileName);

  return file.exists;
}

export function directoryExists(dir: Directory) {
  return dir.exists;
}

// ============================================================
// SQLITE BACKUP / RESTORE
// ============================================================

export function backupSQLiteDB(dbName: string = "app.db") {
  ensureDirExists(DB_DIR);

  const source = new File(Paths.document, dbName);

  if (!source.exists) {
    throw new Error(`SQLite database does not exist: ${dbName}`);
  }

  const backupName = `${dbName}_${Date.now()}.backup`;
  const destination = new File(DB_DIR, backupName);

  source.copy(destination);

  return destination.uri;
}

export function restoreSQLiteDB(
  backupFile: string | File,
  dbName: string = "app.db",
) {
  const source =
    typeof backupFile === "string" ? new File(backupFile) : backupFile;

  if (!source.exists) {
    throw new Error("SQLite backup file does not exist.");
  }

  const destination = new File(Paths.document, dbName);

  source.copy(destination);

  return destination.uri;
}

// ============================================================
// IMAGE OPERATIONS
// ============================================================

export function saveImage(uri: string, fileName?: string) {
  ensureDirExists(IMAGES_DIR);

  const name = fileName ?? `${Crypto.randomUUID()}.jpg`;

  const source = new File(uri);
  const destination = new File(IMAGES_DIR, name);

  source.copy(destination);

  return destination.uri;
}

export function deleteImage(fileName: string) {
  return deleteFile(fileName, IMAGES_DIR);
}

// ============================================================
// FILE SIZE
// ============================================================

export function getFileSize(fileName: string, dir: Directory = DATA_DIR) {
  const file = new File(dir, fileName);

  if (!file.exists) {
    return 0;
  }

  return file.size;
}

export function getFolderSize(dir: Directory) {
  ensureDirExists(dir);

  let total = 0;

  for (const item of dir.list()) {
    if (item instanceof File) {
      total += item.size;
    }
  }

  return total;
}
