import "reflect-metadata";
import { DataSource } from "typeorm";
import { readFileSync } from "fs";
import { join } from "path";
import { Pet } from "./pet/pet";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  synchronize: false,
  entities: [Pet],
});

export async function initializeDatabase(): Promise<void> {
  await AppDataSource.initialize();
  const sql = readFileSync(join(__dirname, "data.sql"), "utf-8");
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const statement of statements) {
    await AppDataSource.query(statement);
  }
}
