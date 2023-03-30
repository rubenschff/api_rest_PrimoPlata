import {ETableNames, UsuarioTable} from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const getById = async (id: number): Promise<IUsuario | Error> => {
  try {
    const result:IUsuario = await Knex(ETableNames.usuario)
      .select(UsuarioTable.id,
          UsuarioTable.name,
          UsuarioTable.nickName,
          UsuarioTable.password,
          UsuarioTable.dateOfBirth)
      .from(ETableNames.usuario)
      .where(UsuarioTable.id, id)
      .first();

    if (result) return result;

    return Error("Não foi possivel recuperar o registro");
  } catch (error) {
    console.log(error);
    return Error("Erro ao consultar o registro");
  }
};
