import { DataSource } from "typeorm";
import { Pet } from "./pet";
import { AppDataSource } from "../database";

export class PetRepository {
  private readonly repository;

  constructor(dataSource: DataSource = AppDataSource) {
    this.repository = dataSource.getRepository(Pet);
  }

  async findById(id: number): Promise<Pet | null> {
    return this.repository.findOneBy({ id });
  }

  async findByNameOrOwnerName(name?: string, ownerName?: string): Promise<Pet[]> {
    if (!name && !ownerName) {
      return this.repository.find();
    }

    const qb = this.repository.createQueryBuilder("pet");
    if (name) qb.orWhere("pet.name = :name", { name });
    if (ownerName) qb.orWhere("pet.ownerName = :ownerName", { ownerName });

    return qb.getMany();
  }
}
