import jwt from "jsonwebtoken";

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "dev-only-admin-secret-change-me";

export function signAdminToken(admin) {
  return jwt.sign({ sub: admin.id, email: admin.email, role: "admin" }, ADMIN_JWT_SECRET, { expiresIn: "12h" });
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Not authenticated." });
  try {
    const payload = jwt.verify(token, ADMIN_JWT_SECRET);
    if (payload.role !== "admin") throw new Error("not an admin token");
    req.adminId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired admin session." });
  }
}
