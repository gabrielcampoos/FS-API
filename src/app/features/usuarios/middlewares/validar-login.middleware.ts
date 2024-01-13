import { NextFunction, Request, Response } from "express";
import { Resultado, httpHelper } from "../../../shared/utils";

export const validarLogin = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, senha } = request.body;

  if (!username || typeof username !== "string") {
    return httpHelper.badRequestError(
      response,
      Resultado.erro(400, "É necessário informar campo em formato string.")
    );
  }

  if (!senha || typeof senha !== "string") {
    return httpHelper.badRequestError(
      response,
      Resultado.erro(400, "É necessário informar campo em formato string.")
    );
  }
  return next();
};
