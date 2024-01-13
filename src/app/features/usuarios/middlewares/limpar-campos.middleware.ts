import { NextFunction, Request, Response } from "express";

export const limparCampos = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { nome, username, senha } = request.body;

  request.body.nome = nome.trim();
  request.body.username = username.trim();
  request.body.senha = senha.trim();

  return next();
};
