import { Base } from "./Base";

export interface TarefaJSON {
  id: string;
  titulo?: string;
  tarefa?: string;
  criadoPor: string;
  criadoEm: Date;
}

interface AtualizarTarefaDTO {
  titulo?: string;
  tarefa?: string;
  criadoEm: Date;
}

export class Tarefa extends Base {
  private _criadoEm: Date;

  constructor(
    _id: string,
    private _criadoPor: string,
    private _titulo?: string,
    private _tarefa?: string
  ) {
    super(_id);
    this._criadoEm = new Date();
  }

  toJSON(): TarefaJSON {
    return {
      id: this._id,
      titulo: this._titulo,
      tarefa: this._tarefa,
      criadoPor: this._criadoPor,
      criadoEm: this._criadoEm,
    };
  }

  atualizarTarefa(novasInfos: AtualizarTarefaDTO): boolean {
    if (novasInfos.titulo) {
      if (novasInfos.titulo?.length < 0) {
        return false;
      }

      this._titulo = novasInfos.titulo;
    }

    if (novasInfos.tarefa) {
      if (novasInfos.tarefa.length < 0) {
        return false;
      }
      this._tarefa = novasInfos.tarefa;
    }

    if (novasInfos.criadoEm) {
      this._criadoEm = novasInfos.criadoEm;
    }

    return true;
  }
}
