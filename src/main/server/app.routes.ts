import { Express } from "express";
import tarefasRoutes from "../../app/features/tarefas/tarefas.routes";
import usuariosRoutes from "../../app/features/usuarios/usuarios.routes";

export const makeRoutes = (app: Express) => {
  app.use(usuariosRoutes(), tarefasRoutes());
};
