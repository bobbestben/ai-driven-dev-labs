import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * @openapi
 * components:
 *   schemas:
 *     Vet:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         specialty:
 *           type: string
 */
@Entity()
export class Vet {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: "varchar" })
  readonly name!: string;

  @Column({ type: "varchar" })
  readonly specialty!: string;

  constructor(name?: string, specialty?: string) {
    if (name !== undefined) this.name = name;
    if (specialty !== undefined) this.specialty = specialty;
  }
}
