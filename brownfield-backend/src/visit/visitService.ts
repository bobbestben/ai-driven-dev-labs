import { Visit } from "./visit";
import { VisitRepository } from "./visitRepository";

export class VisitService {
  private visitRepository: VisitRepository;

  constructor(visitRepository?: VisitRepository) {
    this.visitRepository = visitRepository ?? new VisitRepository();
  }

  findAll(): Promise<Visit[]> {
    return this.visitRepository.findAll();
  }

  findById(id: number): Promise<Visit | null> {
    return this.visitRepository.findById(id);
  }

  findByPetId(petId: number): Promise<Visit[]> {
    return this.visitRepository.findByPetId(petId);
  }
}
