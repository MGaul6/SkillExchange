import dotenv from "dotenv";
dotenv.config();

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { log } from "./vite";

// Create postgres client
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Log that we're connecting to the database
log(`Connecting to database: ${connectionString.split("@")[1] || "**redacted**"}`, "postgres");

// Create connection
const client = postgres(connectionString);

// Create drizzle instance
export const db = drizzle(client);

// Export client for use in migrations
export { client };