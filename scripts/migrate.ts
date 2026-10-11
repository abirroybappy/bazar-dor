
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error("Set DATABASE_URL in .env.local first.");
}

async function main() {
  const { auth } = await import("../src/lib/auth");

  // MongoDB adapter manages Better Auth's database integration.
  // No PostgreSQL pool or SQL migration is needed here.
  console.log(
    "Better Auth is configured with MongoDB. No SQL migration is required."
  );

  // Reference auth so this script verifies the module loads.
  if (!auth) {
    throw new Error("Better Auth initialization failed.");
  }
}

main().catch((error) => {
  console.error("Better Auth setup check failed:", error);
  process.exitCode = 1;
});
