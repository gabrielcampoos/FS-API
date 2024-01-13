import { Router } from "express";
import { autenticar } from "../../shared/middlewares";
import { TarefasController } from "./controller/tarefas.controller";

export default () => {
  const router = Router();

  router.post("/tarefas", autenticar, TarefasController.criarTarefa);

  router.get("/tarefas", autenticar, TarefasController.listarTarefas);

  router.put("/tarefas/:idTarefa", autenticar, TarefasController.editarTarefa);

  router.delete("/tarefas/:id", autenticar, TarefasController.excluirTarefa);

  return router;
};
