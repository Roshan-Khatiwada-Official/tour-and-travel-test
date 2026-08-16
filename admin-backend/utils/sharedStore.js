// The admin panel manages real operational content — bookings, inquiries,
// the package catalog and offers — which live in the customer backend's
// data/ directory. This is a separate Express app/codebase (admin-backend/)
// from backend/, but by design both point at the same JSON files so the
// admin panel reflects what customers actually submitted. See the "Data
// sharing" decision in the project notes.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHARED_DATA_DIR = path.join(__dirname, "..", "..", "backend", "data");

export function readShared(file) {
  const filePath = path.join(SHARED_DATA_DIR, file);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8").trim();
  return raw ? JSON.parse(raw) : [];
}

export function writeShared(file, data) {
  fs.writeFileSync(path.join(SHARED_DATA_DIR, file), JSON.stringify(data, null, 2));
}
