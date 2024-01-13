import { DatabaseConnection } from "../../../../main/database";
import { Usuario } from "../../../models";
import { UsuarioEntity } from "../../../shared/database/entities";
import { CriarUsuarioDTO } from "../dto";

export class UsuariosRepository {
  private _manager = DatabaseConnection.connection.manager;

  async verificarSeUsuarioExistePorUsername(
    username: string
  ): Promise<Usuario | null> {
    const usuarioExistente = await this._manager.findOneBy(UsuarioEntity, {
      username,
    });

    if (!usuarioExistente) return null;

    return this.entityToModel(usuarioExistente);
  }

  async cadastrar(usuario: CriarUsuarioDTO): Promise<Usuario> {
    const criarUsuario = this._manager.create(UsuarioEntity, { ...usuario });

    const usuarioCriado = await this._manager.save(criarUsuario);

    return this.entityToModel(usuarioCriado);
  }

  async listarUsuarios(): Promise<Usuario[]> {
    const listaUsuarios = await this._manager.find(UsuarioEntity);

    return listaUsuarios.map((usuarios) => this.entityToModel(usuarios));
  }

  private entityToModel(dadosDB: UsuarioEntity): Usuario {
    return new Usuario(
      dadosDB.id,
      dadosDB.nome,
      dadosDB.username,
      dadosDB.senha
    );
  }
}
