import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IAlternativaDTO } from "../../models";

export const create = async (
  alternativa: Omit<IAlternativaDTO, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.alternativas)
      .insert(
       alternativa
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

