import {AlternativasTable, ETableNames} from "../../ETableNames";
import { Knex } from "../../knex";
import { IAlternativaDTO } from "../../models";


export const getAlternativas = async (idPergunta: number):Promise<IAlternativaDTO[]> => {


            const result = await Knex(ETableNames.alternativas)
                .select<IAlternativaDTO[]>('*')
                .where(AlternativasTable.perguntaId, idPergunta)

            if (result instanceof Error){
                console.log(result)
            }

            let alternativas: IAlternativaDTO[] = []

            result.map(result => {
                alternativas.push({
                    id: parseInt(result.id.toString()),
                    descricao: result.descricao,
                    explicacao: result.explicacao,
                    alternativa: result.alternativa,
                    perguntaId: parseInt(result.perguntaId.toString())
                })
            })

            return alternativas

}