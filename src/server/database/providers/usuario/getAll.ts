import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const getAll = async (page: number, limit: number, filter: string, id: number ): Promise<IUsuario[]|Error> => {
    try {

        const result = await Knex(ETableNames.usuario)
        .select("id","name","nickName","dateOfBirth")
        .where('id', Number(id))
        .orWhere('name', 'like', `%${filter}%`)
        .offset((page -1) * limit,)
        .limit(limit);

        if(id>0 && result.every(item => item.id !== id)){
            const resultByID = await Knex(ETableNames.usuario)
            .select('*')
            .where('id', '=', id)
            .first();

            if (resultByID) return [...result, resultByID]; 
        }

        return result;
    } catch (error) {
        console.log(error);
        return Error('Houve um erro ao recuperar os registros');
    }
}