import { TarefaJSON } from "../../../models";

export interface RetornoListarDTO {
  sucesso: boolean;
  mensagem: string;
  dados?: TarefaJSON[];
}
