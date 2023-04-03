import {AlternativasTable, ETableNames} from "../../ETableNames";
import { Knex } from "../../knex";
import { IAlternativaDTO } from "../../models";


export const getAlternativas = async (idPergunta: number):Promise<IAlternativaDTO|Error> => {
        try {

            const result = await Knex(ETableNames.alternativas)
                .select<IAlternativaDTO>(
                    AlternativasTable.id,
                    AlternativasTable.descricao,
                    AlternativasTable.explicacao)
                .where(AlternativasTable.perguntaId, idPergunta)

            if (result instanceof Error){
                console.log(result)
                return Error('Não foi possivel recuperar as alternativas')
            }

            return result

        }catch (error) {
            console.log(error)
            return Error('Não foi possivel recuperar as alternativas')
        }
}