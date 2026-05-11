import { DataSource } from "typeorm";
import { AppDataSource } from "../database";
import { Pet } from "./pet";

export class PetRepository {
  private repository = (this.dataSource ?? AppDataSource).getRepository(Pet);

  constructor(private dataSource?: DataSource) {}

  findAll(): Promise<Pet[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<Pet | null> {
    return this.repository.findOneBy({ id });
  }

  findByName(name: string): Promise<Pet | null> {
    return this.repository.findOneBy({ name });
  }

  findByNameAndOwnerName(name: string, ownerName: string): Promise<Pet | null> {
    return this.repository.findOneBy({ name, ownerName });
  }

  save(pet: Pet): Promise<Pet> {
    return this.repository.save(pet);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
