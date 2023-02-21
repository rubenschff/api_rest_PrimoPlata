import {Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";



export const deleteById = async (id: number): Promise<void| Error> =>{
    try {
        
        const result = await Knex(ETableNames.perguntas).where('id', '=', id).delete();

        if(result >0) return;

        return Error('Erro ao deletar registro');
    }catch (e) {
        console.log(e);
        return Error('Erro ao deletar registro');
    }

}