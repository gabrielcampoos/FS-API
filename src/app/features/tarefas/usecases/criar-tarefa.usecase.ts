import { CacheRepository } from "../../../shared/database/repositories";
import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { CriarTarefaDTO } from "../dto";
import { TarefasRepository } from "../repository";

const PREFIX_CACHE = "listar-tarefas";

export class CriarTarefaUsecase {
  async execute(dados: CriarTarefaDTO): Promise<ResultadoDTO> {
    const repository = new TarefasRepository();
    const cacheRepository = new CacheRepository();

    const novaTarefa = await repository.criarTarefa(dados);

    await cacheRepository.delete(`${PREFIX_CACHE}-${dados.criadoPor}`);

    return Resultado.sucesso(
      200,
      "Tarefa criada com sucesso.",
      novaTarefa.toJSON()
    );
  }
}
