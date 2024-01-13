import { NextFunction, Request, Response } from "express";
import { Resultado, httpHelper } from "../../../shared/utils";

export const validarCamposNovoUsuario = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { nome, username, senha } = request.body;

  if (!nome || typeof nome !== "string") {
    return httpHelper.badRequestError(
      response,
      Resultado.erro(400, "É necessário informar um nome em formato string.")
    );
  }

  if (!username || typeof username !== "string") {
    return httpHelper.badRequestError(
      response,
      Resultado.erro(400, "É necessário informa username em formato string.")
    );
  }

  if (!senha || typeof senha !== "string") {
    return httpHelper.badRequestError(
      response,
      Resultado.erro(400, "É necessário informar senha em formato string")
    );
  }

  if (senha.length < 6) {
    return httpHelper.badRequestError(
      response,
      Resultado.erro(400, "A senha deve conter pelo menos 6 caracteres.")
    );
  }
  return next();
};
