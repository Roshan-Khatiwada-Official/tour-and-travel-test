// Minimal JSON-file "database". Each collection is a flat array stored in
// backend/data/<file>.json. Fine for a single dev instance — not safe for
// concurrent writers, which is out of scope for this project's current stage.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = path.join(__dirname, "..", "data");

export function readCollection(file) {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8").trim();
  return raw ? JSON.parse(raw) : [];
}

export function writeCollection(file, data) {
  const filePath = path.join(DATA_DIR, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
