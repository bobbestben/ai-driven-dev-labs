import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Visit } from "../visit/visit";

/**
 * @openapi
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         invoiceNumber:
 *           type: string
 *         invoiceDate:
 *           type: string
 *           format: date-time
 *         amount:
 *           type: number
 *         visit:
 *           $ref: '#/components/schemas/Visit'
 */
@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: "invoice_number", type: "varchar" })
  readonly invoiceNumber!: string;

  @Column({ name: "invoice_date", type: "varchar" })
  readonly invoiceDate!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  readonly amount!: number;

  @OneToOne(() => Visit)
  @JoinColumn({ name: "visit_id" })
  readonly visit!: Visit;

  constructor(
    invoiceNumber?: string,
    invoiceDate?: string,
    amount?: number,
    visit?: Visit,
  ) {
    if (invoiceNumber !== undefined) this.invoiceNumber = invoiceNumber;
    if (invoiceDate !== undefined) this.invoiceDate = invoiceDate;
    if (amount !== undefined) this.amount = amount;
    if (visit !== undefined) this.visit = visit;
  }
}
