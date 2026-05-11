import { DataSource } from "typeorm";
import { AppDataSource } from "../database";
import { Invoice } from "./invoice";

export class InvoiceRepository {
  private repository = (this.dataSource ?? AppDataSource).getRepository(
    Invoice,
  );

  constructor(private dataSource?: DataSource) {}

  findAll(): Promise<Invoice[]> {
    return this.repository.find({
      relations: ["visit", "visit.pet", "visit.vet"],
    });
  }

  findById(id: number): Promise<Invoice | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["visit", "visit.pet", "visit.vet"],
    });
  }
}
