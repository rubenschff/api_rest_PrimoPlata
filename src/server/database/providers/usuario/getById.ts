import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const getById = async (id: number): Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.usuario)
      .select("id","name","nickName","dateOfBirth")
      .from(ETableNames.usuario)
      .where("id", "=", id)
      .first();

    if (result) return result;

    return Error("Não foi possivel recuperar o registro");
  } catch (error) {
    console.log(error);
    return Error("Erro ao consultar o registro");
  }
};
