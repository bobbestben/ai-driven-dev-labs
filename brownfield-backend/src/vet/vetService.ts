import { Vet } from "./vet";
import { VetRepository } from "./vetRepository";

export class VetService {
  private vetRepository: VetRepository;

  constructor(vetRepository?: VetRepository) {
    this.vetRepository = vetRepository ?? new VetRepository();
  }

  findAll(): Promise<Vet[]> {
    return this.vetRepository.findAll();
  }

  findById(id: number): Promise<Vet | null> {
    return this.vetRepository.findById(id);
  }

  findByName(name: string): Promise<Vet | null> {
    return this.vetRepository.findByName(name);
  }
}
