import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
 *         ownerName:
 *           type: string
 */
@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: "varchar" })
  readonly name!: string;

  @Column({ name: "owner_name", type: "varchar" })
  readonly ownerName!: string;

  constructor(name?: string, ownerName?: string) {
    if (name !== undefined) this.name = name;
    if (ownerName !== undefined) this.ownerName = ownerName;
  }
}
