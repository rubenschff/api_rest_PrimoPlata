import  { Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";
import { IPerguntasDTO } from "../../models";
import {RespostaProvider} from "../resposta";
import {AlternativaProvider} from "../alternativa";

export const getAll = async (page: number, limit: number, filter: string, userId: number ): Promise<IPerguntasDTO[]|Error> =>{

    try {

        let result = await Knex(ETableNames.perguntas)
        .select("id","descricao","alternativaCorreta","recompensa","explicacao")
        .orWhere('descricao', 'like', `%${filter}%`)
        .offset((page -1) * limit,)
        .limit(limit);


        for (let i = 0; i < result.length; i++) {

            result[i]["respostas"] = await RespostaProvider.getRespostas(userId,result[i]['id'])
            result[i]["alternativas"] = await AlternativaProvider.getAlternativas(result[i]['id'])

        }
        
        return result;

    } catch (error) {
        return Error("Não foi possivel recuperar os registros");
    }
}