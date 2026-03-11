import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Client } from "pg";
import dotenv from "dotenv";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure PostgreSQL (use your Supabase DB connection string)
console.log("DB URL:", process.env.SUPABASE_DB_URL);
const client = new Client({
  connectionString: process.env.SUPABASE_DB_URL,
});

async function runMigrations() {
  try {
    await client.connect();

    const migrationsDir = path.join(__dirname, "sql"); // folder with .sql files

    // Sort ensures 001, 002, ... run in proper order
    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const sqlPath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(sqlPath, "utf8").trim();

      if (!sql) continue;
      console.log(`\n🚀 Running migration: ${file}`);
      await client.query(sql);
      console.log(`✅ Finished: ${file}`);
    }

    console.log("\n🎉 All migrations executed successfully!");
  } catch (err) {
    console.error("\n❌ Migration failed:\n", err);
  } finally {
    await client.end();
  }
}

runMigrations();
