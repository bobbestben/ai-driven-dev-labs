import { DataSource } from "typeorm";
import { AppDataSource } from "../database";
import { Pet } from "./pet";

export class PetRepository {
  private repository = (this.dataSource ?? AppDataSource).getRepository(Pet);

  constructor(private dataSource?: DataSource) {}

  findAll(): Promise<Pet[]> {
    return this.repository.find({ relations: ["owner"] });
  }

  findById(id: number): Promise<Pet | null> {
    return this.repository.findOne({ where: { id }, relations: ["owner"] });
  }

  findByName(name: string): Promise<Pet | null> {
    return this.repository.findOne({ where: { name }, relations: ["owner"] });
  }

  findByNameAndOwnerId(name: string, ownerId: number): Promise<Pet | null> {
    return this.repository.findOne({
      where: { name, owner: { id: ownerId } },
      relations: ["owner"],
    });
  }

  async save(pet: Pet): Promise<Pet> {
    const saved = await this.repository.save(pet);
    return (await this.repository.findOne({ where: { id: saved.id }, relations: ["owner"] }))!;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
