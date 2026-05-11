import { Pet } from "./pet";
import { PetRepository } from "./petRepository";

export class PetService {
  private petRepository: PetRepository;

  constructor(petRepository?: PetRepository) {
    this.petRepository = petRepository ?? new PetRepository();
  }

  findAll(): Promise<Pet[]> {
    return this.petRepository.findAll();
  }

  findById(id: number): Promise<Pet | null> {
    return this.petRepository.findById(id);
  }

  findByName(name: string): Promise<Pet | null> {
    return this.petRepository.findByName(name);
  }

  async save(pet: Pet): Promise<Pet> {
    await this.validatePetUniquenessPerOwner(pet);
    return this.petRepository.save(pet);
  }

  async delete(id: number): Promise<void> {
    return this.petRepository.delete(id);
  }

  private async validatePetUniquenessPerOwner(pet: Pet): Promise<void> {
    const existing = await this.petRepository.findByNameAndOwnerName(
      pet.name,
      pet.ownerName,
    );
    if (existing !== null && existing.id !== pet.id) {
      throw new Error(
        `Owner ${pet.ownerName} already has a pet named ${pet.name}`,
      );
    }
  }
}
