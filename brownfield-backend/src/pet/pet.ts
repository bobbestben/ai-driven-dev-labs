import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Owner } from "../owner/owner";

/**
 * @openapi
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         owner:
 *           $ref: '#/components/schemas/Owner'
 */
@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: "varchar" })
  readonly name!: string;

  @ManyToOne(() => Owner)
  @JoinColumn({ name: "owner_id" })
  readonly owner!: Owner;

  constructor(name?: string, owner?: Owner) {
    if (name !== undefined) this.name = name;
    if (owner !== undefined) this.owner = owner;
  }
}
