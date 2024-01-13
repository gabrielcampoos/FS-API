import { TarefaJSON } from "../../../models";
import { CacheRepository } from "../../../shared/database/repositories";
import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { TarefasRepository } from "../repository";

const PREFIX_CACHE = "listar-tarefas";

export class ListarTarefasUsecase {
  async execute(username: string): Promise<ResultadoDTO> {
    const repository = new TarefasRepository();
    const cacheRepository = new CacheRepository();

    const busca = await repository.usuarioExiste(username);

    if (!busca) return Resultado.erro(400, "Usuário não encontrado.");

    const tarefasCache = await cacheRepository.get<TarefaJSON[]>(
      `${PREFIX_CACHE}-${username}`
    );
    let tarefas: TarefaJSON[] = [];

    if (!tarefasCache) {
      const tarefasPrincipal = await repository.listarTarefas(username);
      tarefas = tarefasPrincipal.map((t) => t.toJSON());

      await cacheRepository.set<TarefaJSON[]>(
        `${PREFIX_CACHE}-${username}`,
        tarefas
      );
    } else {
      tarefas = tarefasCache;
    }

    return Resultado.sucesso(200, "Tarefas listadas com sucesso.", tarefas);
  }
}
