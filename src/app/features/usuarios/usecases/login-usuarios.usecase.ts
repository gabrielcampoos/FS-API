import { Resultado, ResultadoDTO, bcrypt, jwt } from "../../../shared/utils";
import { CriarUsuarioDTO } from "../dto";
import { UsuariosRepository } from "../repository";

type LoginUsuarioDTO = Omit<CriarUsuarioDTO, "nome">;

export class LoginUsuarioUsecase {
  async execute(dados: LoginUsuarioDTO): Promise<ResultadoDTO> {
    const repository = new UsuariosRepository();

    const usuarioExistente =
      await repository.verificarSeUsuarioExistePorUsername(dados.username);

    if (!usuarioExistente)
      return Resultado.erro(404, "Usuário não encontrado.");

    const senhaValida = await bcrypt.compareHash(
      dados.senha,
      usuarioExistente.toJSONComSenha().senha
    );

    if (!senhaValida) return Resultado.erro(404, "Usuário ou senha inválidos.");

    const dadosUsuario = usuarioExistente.toJSON();
    const token = jwt.encoded(dadosUsuario);

    return Resultado.sucesso(200, "Usuário logado com sucesso.", {
      ...dadosUsuario,
      token,
    });
  }
}
