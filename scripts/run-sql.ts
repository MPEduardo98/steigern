// scripts/run-sql.ts
// Ejecuta un archivo .sql contra la base de .env.local.
//   npx tsx scripts/run-sql.ts scripts/migrations/001-expediente-empleado.sql
import { readFile } from "node:fs/promises";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const file = process.argv[2];
  if (!file) throw new Error("Indica el archivo: npx tsx scripts/run-sql.ts <archivo.sql>");

  const sql = await readFile(file, "utf8");
  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
  });

  await conn.query(sql);
  await conn.end();
  console.log(`✅ Aplicado: ${file}`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
