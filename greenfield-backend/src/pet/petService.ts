import { Pet } from "./pet";
import { PetRepository } from "./petRepository";

export class PetService {
  private petRepository: PetRepository;

  constructor(petRepository?: PetRepository) {
    this.petRepository = petRepository ?? new PetRepository();
  }

  findById(id: number): Promise<Pet | null> {
    return this.petRepository.findById(id);
  }

  findByName(name: string): Promise<Pet[]> {
    return this.petRepository.findByName(name);
  }
}
