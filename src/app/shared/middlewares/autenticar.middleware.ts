import { NextFunction, Request, Response } from "express";
import { Resultado, httpHelper, jwt } from "../utils";

export const autenticar = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { token } = request.headers;

  if (!token) {
    return httpHelper.badRequestError(
      response,
      Resultado.erro(401, "Token inválido.")
    );
  }

  try {
    const usuario = jwt.decoded(token as string);
    request.usuario = usuario;
    return next();
  } catch (erro: any) {
    return httpHelper.badRequestError(
      response,
      Resultado.erro(401, erro.toString())
    );
  }
};
