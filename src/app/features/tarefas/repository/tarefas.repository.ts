import { FindOptionsWhere } from "typeorm";
import { DatabaseConnection } from "../../../../main/database";
import { Tarefa } from "../../../models";
import { TarefaEntity, UsuarioEntity } from "../../../shared/database/entities";
import { CriarTarefaDTO } from "../dto";

interface AlterarDTO {
  idTarefa: string;
  titulo?: string;
  tarefa?: string;
}

export class TarefasRepository {
  private _manager = DatabaseConnection.connection.manager;

  async usuarioExiste(username: string): Promise<boolean> {
    const usuarioExiste = await this._manager.findOneBy(UsuarioEntity, {
      username,
    });

    return !!usuarioExiste;
  }

  async tarefaExiste(
    username: string,
    id: string
  ): Promise<Tarefa | undefined> {
    const tarefaEncontrada = await this._manager.findOne(TarefaEntity, {
      where: { id: id, criadoPor: username },
      relations: { usuario: true },
    });

    if (!tarefaEncontrada) return undefined;

    return this.entityToModel(tarefaEncontrada);
  }

  async criarTarefa(tarefa: CriarTarefaDTO): Promise<Tarefa> {
    const criarTarefa = this._manager.create(TarefaEntity, { ...tarefa });

    const tarefaCriada = await this._manager.save(criarTarefa);

    return this.entityToModel(tarefaCriada);
  }

  async listarTarefas(username: string): Promise<Tarefa[]> {
    const clausula: FindOptionsWhere<TarefaEntity> = {
      criadoPor: username,
    };

    const tarefasListadas = await this._manager.find(TarefaEntity, {
      where: clausula,
    });
    console.log(tarefasListadas);

    return tarefasListadas.map((tarefas) => this.entityToModel(tarefas));
  }

  async editarTarefa(dados: AlterarDTO): Promise<void> {
    const { idTarefa, titulo, tarefa } = dados;

    await this._manager.update(
      TarefaEntity,
      { id: idTarefa },
      { titulo, tarefa }
    );
  }

  async excluirTarefa(id: string): Promise<void> {
    const tarefa = await this._manager.delete(TarefaEntity, { id: id });

    if (!tarefa) return undefined;
  }

  private entityToModel(dadosDB: TarefaEntity): Tarefa {
    return new Tarefa(
      dadosDB.id,
      dadosDB.criadoPor,
      dadosDB.titulo,
      dadosDB.tarefa
    );
  }
}
