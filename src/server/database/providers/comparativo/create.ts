import  { Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";
import {IComparativoDTO} from "../../models";
import {ComparativoProvider} from "./index";


export const create = async (comparativo: Omit<IComparativoDTO, 'id'>): Promise<number| Error> => {
    console.log(comparativo)
    try {
        const update = await verifyUser(comparativo);
        if(typeof update === 'number'){
            return update;
        }

        const [result] = await Knex(ETableNames.comparacao).insert(comparativo).returning('id');

        if(typeof result === 'object'){
            return result.id;
        }else if (typeof result === 'number'){
            return result;
        }
        return Error('Erro ao inserir registro');
    }  catch (e) {
        return Error('Erro ao inserir registro');
    }
};

const verifyUser = async (comparativo: Omit<IComparativoDTO, 'id'>):Promise<number|Error>=>{
    try {
        const verify = await Knex(ETableNames.comparacao).select().where('usuarioId','=',comparativo.usuarioId)
        console.log(verify)
        if (!verify) {
            const {usuarioId: _, ...newObj} = comparativo;
            const update = await ComparativoProvider.updateByUserId(comparativo.usuarioId, newObj)
            if (update instanceof Error) {
                return Error('Não foi possivel atualizar');
            }
            return comparativo.usuarioId;
        }
        return Error('Não foi possivel atualizar');
    }catch (e){
        console.log(e);
        return Error('Não foi possivel atualizar');
    }

}