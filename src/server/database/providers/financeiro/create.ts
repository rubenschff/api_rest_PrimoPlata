import  { Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";
import {IFinanceiroDTO} from "../../models";
import {FinanceiroProvider} from "./index";


export const create = async (financeiro: Omit<IFinanceiroDTO, 'id'>): Promise<number| Error> => {
    try {
        const update = await verifyUser(financeiro);
        if(typeof update === 'number'){
            return update;
        }

        const [result] = await Knex(ETableNames.financeiro).insert(financeiro).returning('id');

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

const verifyUser = async (financeiro: Omit<IFinanceiroDTO, 'id'>):Promise<number|Error>=>{
    try {
        const verify = await Knex(ETableNames.financeiro).select().where('usuarioId','=',financeiro.usuarioId)
        console.log(verify)
        if (!verify) {
            const {usuarioId: _, ...newObj} = financeiro;
            const update = await FinanceiroProvider.updateByUserId(financeiro.usuarioId, newObj)
            if (update instanceof Error) {
                return Error('Não foi possivel atualizar');
            }
            return financeiro.usuarioId;
        }
        return Error('Não foi possivel atualizar');
    }catch (e){
        console.log(e);
        return Error('Não foi possivel atualizar');
    }

}