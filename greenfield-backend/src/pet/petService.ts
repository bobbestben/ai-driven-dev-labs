import { Pet } from "./pet";
import { PetRepository } from "./petRepository";

export class PetService {
  constructor(private readonly petRepository: PetRepository = new PetRepository()) {}

  async findById(id: number): Promise<Pet | null> {
    return this.petRepository.findById(id);
  }

  async findByNameOrOwnerName(name?: string, ownerName?: string): Promise<Pet[]> {
    return this.petRepository.findByNameOrOwnerName(name, ownerName);
  }
}
