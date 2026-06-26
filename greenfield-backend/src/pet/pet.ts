import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("pets")
export class Pet {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: "text" })
  readonly name!: string;

  @Column({ name: "owner_name", type: "text" })
  readonly ownerName!: string;

  constructor(name?: string, ownerName?: string) {
    if (name !== undefined) (this as any).name = name;
    if (ownerName !== undefined) (this as any).ownerName = ownerName;
  }
}
