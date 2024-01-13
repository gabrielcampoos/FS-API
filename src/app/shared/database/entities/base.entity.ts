import { randomUUID } from "crypto";
import { BeforeInsert, Column, PrimaryColumn } from "typeorm";

export class BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ name: "criado_em" })
  criadoEm!: Date;

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
    this.criadoEm = new Date();
  }
}
