import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Pet } from "../pet/pet";
import { Vet } from "../vet/vet";

/**
 * @openapi
 * components:
 *   schemas:
 *     Visit:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         dateTime:
 *           type: string
 *           format: date-time
 *         clinic:
 *           type: string
 *         summary:
 *           type: string
 *         pet:
 *           $ref: '#/components/schemas/Pet'
 *         vet:
 *           $ref: '#/components/schemas/Vet'
 */
@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: "date_time", type: "varchar" })
  readonly dateTime!: string;

  @Column({ type: "varchar" })
  readonly clinic!: string;

  @Column({ type: "text" })
  readonly summary!: string;

  @ManyToOne(() => Pet)
  @JoinColumn({ name: "pet_id" })
  readonly pet!: Pet;

  @ManyToOne(() => Vet)
  @JoinColumn({ name: "vet_id" })
  readonly vet!: Vet | null;

  constructor(
    dateTime?: string,
    clinic?: string,
    summary?: string,
    pet?: Pet,
    vet?: Vet | null,
  ) {
    if (dateTime !== undefined) this.dateTime = dateTime;
    if (clinic !== undefined) this.clinic = clinic;
    if (summary !== undefined) this.summary = summary;
    if (pet !== undefined) this.pet = pet;
    if (vet !== undefined) this.vet = vet;
  }
}
