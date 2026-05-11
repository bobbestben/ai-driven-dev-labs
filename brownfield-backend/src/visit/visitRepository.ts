import { DataSource } from "typeorm";
import { AppDataSource } from "../database";
import { Visit } from "./visit";

export class VisitRepository {
  private repository = (this.dataSource ?? AppDataSource).getRepository(Visit);

  constructor(private dataSource?: DataSource) {}

  findAll(): Promise<Visit[]> {
    return this.repository.find({ relations: ["pet", "vet"] });
  }

  findById(id: number): Promise<Visit | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["pet", "vet"],
    });
  }

  findByPetId(petId: number): Promise<Visit[]> {
    return this.repository.find({
      where: { pet: { id: petId } },
      relations: ["pet", "vet"],
    });
  }
}
