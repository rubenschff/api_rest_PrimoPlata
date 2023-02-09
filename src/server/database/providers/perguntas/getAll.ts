import  { Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";
import { IPerguntasDTO } from "../../models";

export const getAll = async (page: number, limit: number, filter: string, id: number ): Promise<IPerguntasDTO[]|Error> =>{

    try {

        let result = await Knex(ETableNames.perguntas)
        .select("id","descricao","alternativaCorreta","recompensa","explicacao")
        .where('id', Number(id))
        .orWhere('descricao', 'like', `%${filter}%`)
        .offset((page -1) * limit,)
        .limit(limit);

        console.log(result.length);

        //TODO ver com a nathi como repassar essa info
        result.forEach(async (element) => {
            const alternativas = await Knex(ETableNames.alternativas).select("alternativa", "descricao", "explicacao").where('perguntaId', '=', element.id);
            // console.log(alternativas)
            element["alternativas"] = alternativas
            console.log(element)
        });
        

        if(id>0 && result.every(item => item.id !== id)){
            const resultByID = await Knex(ETableNames.usuario)
            .select('*')
            .where('id', '=', id)
            .first();

            if (resultByID) return [...result, resultByID]; 
        }

        return result;

    } catch (error) {
        return Error("Não foi possivel recuperar os registros");
    }
}