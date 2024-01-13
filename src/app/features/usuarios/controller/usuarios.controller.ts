import { Request, Response } from "express";
import { Resultado, httpHelper } from "../../../shared/utils";
import { CriarUsuarioDTO } from "../dto";
import {
  CriarUsuarioUsecase,
  ListarTodosUsuariosUsecase,
  LoginUsuarioUsecase,
} from "../usecases";
import { ObterUsuario } from "../usecases/obter-usuario.usecase";

export class UsuariosController {
  static async criarUsuario(request: Request, response: Response) {
    const usuario: CriarUsuarioDTO = request.body;

    try {
      const usecase = new CriarUsuarioUsecase();

      const resultado = await usecase.execute(usuario);

      if (!resultado.sucesso)
        return httpHelper.badRequestError(response, resultado);

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        response,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  static async loginUsuario(request: Request, response: Response) {
    const { username, senha }: CriarUsuarioDTO = request.body;

    try {
      const usecase = new LoginUsuarioUsecase();

      const resultado = await usecase.execute({ username, senha });

      if (!resultado.sucesso)
        return httpHelper.badRequestError(response, resultado);

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        response,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  static async listarUsuarios(request: Request, response: Response) {
    try {
      const usecase = new ListarTodosUsuariosUsecase();

      const resultado = await usecase.execute();

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        response,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  static async obterUsuario(request: Request, response: Response) {
    try {
      const { username } = request.usuario;

      const usecase = new ObterUsuario();

      const resultado = await usecase.execute(username);

      return httpHelper.success(response, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        response,
        Resultado.erro(500, erro.toString())
      );
    }
  }
}
