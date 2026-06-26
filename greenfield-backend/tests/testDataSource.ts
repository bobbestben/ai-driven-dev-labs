import { DataSource } from "typeorm";
import { readFileSync } from "fs";
import { join } from "path";
import { Pet } from "../src/pet/pet";

export async function createTestDataSource(): Promise<DataSource> {
  const dataSource = new DataSource({
    type: "better-sqlite3",
    database: ":memory:",
    entities: [Pet],
    synchronize: false,
  });

  await dataSource.initialize();
  const sql = readFileSync(join(__dirname, "../src/data.sql"), "utf-8");
  (dataSource.driver as any).databaseConnection.exec(sql);

  return dataSource;
}
