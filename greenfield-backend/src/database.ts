import "reflect-metadata";
import { DataSource } from "typeorm";
import { readFileSync } from "fs";
import { join } from "path";
import { Pet } from "./pet/pet";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  entities: [Pet],
  synchronize: false,
});

export async function initializeDatabase(dataSource: DataSource = AppDataSource): Promise<void> {
  await dataSource.initialize();
  const sql = readFileSync(join(__dirname, "data.sql"), "utf-8");
  (dataSource.driver as any).databaseConnection.exec(sql);
}
