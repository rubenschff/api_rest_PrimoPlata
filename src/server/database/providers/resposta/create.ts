import {IRespostaDTO} from "../../models";
import {Knex} from "../../knex";
import {ETableNames, RespostaTable} from "../../ETableNames";


export const create = async (resposta: Omit<IRespostaDTO, 'id'>): Promise<number|Error> => {
    try {

        const verify = await Knex(ETableNames.pergunta_resposta)
            .select<IRespostaDTO[]>('*')
            .where(RespostaTable.idAlternativa,resposta.idAlternativa)
            .where(RespostaTable.idPergunta,resposta.idPergunta)
            .where(RespostaTable.idUsuario, resposta.idUsuario)

        if (verify.length > 0){
            return Error('Alternativa ja respondida!')
        }

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