import "reflect-metadata";
import { DataSource } from "typeorm";
import { readFileSync } from "fs";
import { join } from "path";
import { Pet } from "../src/pet/pet";
import { Vet } from "../src/vet/vet";
import { Visit } from "../src/visit/visit";
import { Invoice } from "../src/invoice/invoice";

export async function createTestDataSource(): Promise<DataSource> {
  const dataSource = new DataSource({
    type: "better-sqlite3",
    database: ":memory:",
    synchronize: false,
    entities: [Pet, Vet, Visit, Invoice],
  });

  await dataSource.initialize();

  const sql = readFileSync(join(__dirname, "../src/data.sql"), "utf-8");
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const statement of statements) {
    await dataSource.query(statement);
  }

  return dataSource;
}
