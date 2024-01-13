import { Request, Response } from "express";
import { Resultado, httpHelper } from "../../../shared/utils";
import {
  CriarTarefaUsecase,
  EditarTarefaUsecase,
  ExcluirTarefaUsecase,
  ListarTarefasUsecase,
} from "../usecases";

export class TarefasController {
  static async criarTarefa(request: Request, response: Response) {
    const { titulo, tarefa, criadoPor } = request.body;

    try {
      const usecase = new CriarTarefaUsecase();

      const resultado = await usecase.execute({ titulo, tarefa, criadoPor });

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        response,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  static async listarTarefas(request: Request, response: Response) {
    const { username } = request.usuario;

    try {
      const usecase = new ListarTarefasUsecase();

      const resultado = await usecase.execute(username);

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        response,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  static async editarTarefa(request: Request, response: Response) {
    const { idTarefa } = request.params;
    const { username, titulo, tarefa, criadoEm } = request.body;

    try {
      const usecase = new EditarTarefaUsecase();

      const resultado = await usecase.execute({
        idTarefa,
        username,
        novosDados: {
          titulo,
          tarefa,
          criadoEm,
        },
      });

      if (!resultado.sucesso)
        return httpHelper.badRequestError(response, resultado);

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(response, erro.toString());
    }
  }

  static async excluirTarefa(request: Request, response: Response) {
    const { id } = request.params;
    const { username } = request.body;

    try {
      const usecase = new ExcluirTarefaUsecase();

      const resultado = await usecase.execute(id, username);

      if (!resultado.sucesso)
        return httpHelper.badRequestError(response, resultado);

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(response, erro.toString());
    }
  }
}
