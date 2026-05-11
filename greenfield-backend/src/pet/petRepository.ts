import { DataSource } from "typeorm";
import { AppDataSource } from "../database";
import { Pet } from "./pet";

export class PetRepository {
  private repository = (this.dataSource ?? AppDataSource).getRepository(Pet);

  constructor(private dataSource?: DataSource) {}

  findById(id: number): Promise<Pet | null> {
    return this.repository.findOneBy({ id });
  }

  findByName(name: string): Promise<Pet[]> {
    return this.repository.findBy({ name });
  }
}
