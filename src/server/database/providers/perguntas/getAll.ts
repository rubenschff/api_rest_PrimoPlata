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

        // await result.forEach(async(i)=>{
        //     i["alternativas"]=''
        // })

        await result.forEach(async (result) => {
            console.log(result.id);
            const alternativas = await Knex(ETableNames.alternativas).select("alternativa", "descricao", "explicacao").where('perguntaId', '=', result.id);
            result["alternativas"]=`${alternativas}`
        });
        
        console.log(result)

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