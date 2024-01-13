import { CacheRepository } from "../../../shared/database/repositories";
import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { UsuariosRepository } from "../../usuarios/repository";
import { TarefasRepository } from "../repository";

const PREFIX_CACHE = "listar-tarefas";

export class ExcluirTarefaUsecase {
  async execute(id: string, username: string): Promise<ResultadoDTO> {
    const tarefarepository = new TarefasRepository();
    const usuariorepository = new UsuariosRepository();
    const cacheRepository = new CacheRepository();

    const usuarioEncontrado =
      await usuariorepository.verificarSeUsuarioExistePorUsername(username);

    if (!usuarioEncontrado)
      return Resultado.erro(
        400,
        "Usuário não encontrado. Não foi possível excluir a tarefa."
      );

    const tarefa = await tarefarepository.tarefaExiste(username, id);

    if (!tarefa) return Resultado.erro(400, "Tarefa não encontrada.");

    await tarefarepository.excluirTarefa(id);
    await cacheRepository.delete(`${PREFIX_CACHE}-${username}`);
    await cacheRepository.delete(`${PREFIX_CACHE}-${id}`);

    return Resultado.sucesso(200, "tarefa deletada com sucesso.", id);
  }
}
