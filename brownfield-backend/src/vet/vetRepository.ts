import { DataSource } from "typeorm";
import { AppDataSource } from "../database";
import { Vet } from "./vet";

export class VetRepository {
  private repository = (this.dataSource ?? AppDataSource).getRepository(Vet);

  constructor(private dataSource?: DataSource) {}

  findAll(): Promise<Vet[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<Vet | null> {
    return this.repository.findOneBy({ id });
  }

  findByName(name: string): Promise<Vet | null> {
    return this.repository.findOneBy({ name });
  }
}
