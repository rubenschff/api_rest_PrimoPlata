import {IRespostaDTO} from "../../models";
import {Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";


export const create = async (resposta: Omit<IRespostaDTO, 'id'>): Promise<number|Error> => {
    try {
        const [result] = await Knex(ETableNames.pergunta_resposta).insert(resposta).returning("id");

        console.log(result)

        if (typeof result === "object") {
            return result.id;
        } else if (typeof result === "number") {
            return result;
        }

        return Error("Não foi possivel criar a resposta");
    } catch (error) {
        console.log(error)
        return Error("Não foi possivel criar a resposta");
    }
}