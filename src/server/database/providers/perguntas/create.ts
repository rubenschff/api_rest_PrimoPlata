import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerguntasDTO } from "../../models";

export const create = async (
  pergunta: Omit<IPerguntasDTO, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.perguntas)
      .insert(
       pergunta
      )
      .returning("id");

     

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return Error("Não foi possivel criar as informações");
  } catch (error) {
    return Error("Não foi possivel criar as informações");
  }
}

