import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const getByNickName = async (nickName: string): Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.usuario)
      .select("id","name","nickName",'password',"dateOfBirth")
      .from(ETableNames.usuario)
      .where("nickName", "=", nickName)
      .first();

    if (result) return result;

    return Error("Usuário não encontrado");
  } catch (error) {
    console.log(error);
    return Error("Erro ao consultar o usuário");
  }
};
