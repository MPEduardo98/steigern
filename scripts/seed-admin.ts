import { hash } from "bcryptjs";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const ADMIN_EMAIL    = process.env.SEED_ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD!;

async function main() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Faltan variables SEED_ADMIN_EMAIL o SEED_ADMIN_PASSWORD");
  }

  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  const passwordHash = await hash(ADMIN_PASSWORD, 12);

  await conn.execute(
    `INSERT IGNORE INTO usuarios_portal (email, password_hash, rol, activo)
     VALUES (?, ?, 'administrador', 1)`,
    [ADMIN_EMAIL, passwordHash]
  );

  console.log(`✅ Admin listo: ${ADMIN_EMAIL}`);

  await conn.end();
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});