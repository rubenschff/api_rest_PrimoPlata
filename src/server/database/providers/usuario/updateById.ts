import {passwordCrypto} from "../../../shared/services";
import {ETableNames, UsuarioTable} from "../../ETableNames";
import {Knex} from "../../knex";
import {IUsuario} from "../../models";

export const updateById = async (
  id: number,
  usuario: Omit<IUsuario, "id">
): Promise<IUsuario | Error> => {

  try {
    if(usuario.password){
      usuario.password = await passwordCrypto.hashPassword(usuario.password!);
    }

    const result:IUsuario = await Knex(ETableNames.usuario)
      .update(usuario)
      .where(UsuarioTable.id, id)
        .returning<IUsuario>([
            UsuarioTable.id,
            UsuarioTable.name,
            UsuarioTable.nickName,
            UsuarioTable.password,
            UsuarioTable.dateOfBirth
        ]);

    if (typeof result === 'object'){
      return result
    }

    return Error("Ocorreu um erro ao atualizar o usuário");
    
  } catch (error) {
    console.log(error);
    return Error("Ocorreu um erro ao atualizar o usuário");
  }
};
