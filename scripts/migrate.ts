import nextEnv from "@next/env";
nextEnv.loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL)
  throw new Error("Set DATABASE_URL in .env.local first.");
const { auth, pool } = await import("../src/lib/auth");
const { getMigrations } = await import("better-auth/db/migration");
try {
  const { runMigrations } = await getMigrations(auth.options);
  await runMigrations();
  console.log("BetterAuth tables are ready.");
} finally {
  await pool.end();
}
