import "reflect-metadata";
import { DataSource } from "typeorm";
import { readFileSync } from "fs";
import { join } from "path";
import { Pet } from "./pet/pet";
import { Vet } from "./vet/vet";
import { Visit } from "./visit/visit";
import { Invoice } from "./invoice/invoice";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  synchronize: false,
  entities: [Pet, Vet, Visit, Invoice],
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
