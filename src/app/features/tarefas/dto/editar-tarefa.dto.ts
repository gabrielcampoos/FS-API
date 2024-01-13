export interface EditarTarefaDTO {
  username: string;
  idTarefa: string;
  novosDados: {
    titulo?: string;
    tarefa?: string;
    criadoEm: Date;
  };
}
