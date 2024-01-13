import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableTarefas1704839239342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tarefas",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "titulo",
            type: "text",
          },
          {
            name: "tarefa",
            type: "text",
          },
          {
            name: "criado_por",
            type: "varchar",
            length: "100",
          },
          {
            name: "criado_em",
            type: "timestamp",
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["criado_por"],
            referencedColumnNames: ["username"],
            referencedTableName: "usuarios",
            name: "fk_tarefas_criado_por",
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tarefas", true, true, true);
  }
}
