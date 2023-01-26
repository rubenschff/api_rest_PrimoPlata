import {IUsuario} from "../../models";
import  { Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";


export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number| Error> => {
    try {
        const [result] = await Knex(ETableNames.usuario).insert(usuario).returning('id');

        if(typeof result === 'object'){
            return result.id;
        }else if (typeof result === 'number'){
            return result;
        }

        return Error('Erro ao inserir registro');
    }  catch (e) {
        console.log(e);
        return Error('Erro ao inserir registro');
    }
};