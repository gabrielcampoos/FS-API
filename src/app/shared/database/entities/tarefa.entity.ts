import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, UsuarioEntity } from ".";

@Entity({ name: "tarefas" })
export class TarefaEntity extends BaseEntity {
  @Column()
  titulo!: string;

  @Column()
  tarefa!: string;

  @Column({ name: "criado_por" })
  criadoPor!: string;

  @ManyToOne(() => UsuarioEntity, (entity) => entity.tarefas)
  @JoinColumn({
    name: "criado_por",
    foreignKeyConstraintName: "fk_tarefas_criado_por",
    referencedColumnName: "username",
  })
  usuario!: UsuarioEntity;
}
