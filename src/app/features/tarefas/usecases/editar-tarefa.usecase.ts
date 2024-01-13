import { CacheRepository } from "../../../shared/database/repositories";
import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { UsuariosRepository } from "../../usuarios/repository";
import { EditarTarefaDTO } from "../dto";
import { TarefasRepository } from "../repository";

const PREFIX_CACHE = "listar-tarefas";

export class EditarTarefaUsecase {
  async execute(dados: EditarTarefaDTO): Promise<ResultadoDTO> {
    const { idTarefa, username, novosDados } = dados;

    const usuarioRepository = new UsuariosRepository();
    const tarefaRepository = new TarefasRepository();
    const cacheRepository = new CacheRepository();

    const usuarioEncontrado =
      await usuarioRepository.verificarSeUsuarioExistePorUsername(username);

    if (!usuarioEncontrado)
      return Resultado.erro(400, "Usuário não encontrado.");

    const tarefa = await tarefaRepository.tarefaExiste(username, idTarefa);

    if (!tarefa) return Resultado.erro(400, "Tarefa não encontrada.");

    const atualizada = tarefa.atualizarTarefa({
      titulo: novosDados.titulo,
      tarefa: novosDados.tarefa,
      criadoEm: novosDados.criadoEm,
    });

    await cacheRepository.delete(`${PREFIX_CACHE}-${username}`);
    await cacheRepository.delete(`${PREFIX_CACHE}-${idTarefa}`);

    if (!atualizada)
      return Resultado.erro(400, "Tarefa não pode ser atualizada.");

    const tarefaJSON = tarefa.toJSON();

    tarefaRepository.editarTarefa({
      idTarefa,
      titulo: tarefaJSON.titulo,
      tarefa: tarefaJSON.tarefa,
    });

    return Resultado.sucesso(200, "Tarefa editada.", tarefa);
  }
}
