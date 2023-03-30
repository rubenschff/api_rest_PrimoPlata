import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IAlternativaDTO } from "../../models";


export const getAlternativas = async (idPergunta: number):Promise<IAlternativaDTO[]|Error> => {
        try {

            const result = await Knex(ETableNames.alternativas)
                .select("id", "descricao", "explicacao")
                .where("perguntaId", '=', idPergunta)

            if (typeof result === 'object'){
                return result
            }

            console.log(result)
            return Error('Não foi possivel recuperar as alternativas')

        }catch (error) {
            console.log(error)
            return Error('Não foi possivel recuperar as alternativas')
        }
}