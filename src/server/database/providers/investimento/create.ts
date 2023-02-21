import {IUsuario, IinvestimentoDTO} from "../../models";
import  { Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";


export const create = async (investimento: Omit<IinvestimentoDTO, 'id'>): Promise<number| Error> => {
    try {
        const [result] = await Knex(ETableNames.investimento).insert(investimento).returning('id');

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