import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, TarefaEntity } from ".";

@Entity({ name: "usuarios" })
export class UsuarioEntity extends BaseEntity {
  @Column()
  nome!: string;

  @Column()
  username!: string;

  @Column()
  senha!: string;

  @OneToMany(() => TarefaEntity, (entity) => entity.usuario)
  tarefas!: TarefaEntity[];
}
