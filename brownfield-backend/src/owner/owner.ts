import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: "varchar" })
  readonly name!: string;

  @Column({ type: "varchar" })
  readonly address!: string;

  constructor(name?: string, address?: string) {
    if (name !== undefined) this.name = name;
    if (address !== undefined) this.address = address;
  }
}
