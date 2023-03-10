import { passwordCrypto } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const updateById = async (
  id: number,
  usuario: Omit<IUsuario, "id">
): Promise<void | Error> => {

  try {
    if(usuario.password){
      usuario.password = await passwordCrypto.hashPassword(usuario.password!);
    }
    const result = await Knex(ETableNames.usuario)
      .update(usuario)
      .where("id", "=", id);

    if (result > 0) return;

    return Error("Ocorreu um erro ao atualizar o usuário");
    
  } catch (error) {
    console.log(error);
    return Error("Ocorreu um erro ao atualizar o usuário");
  }
};
