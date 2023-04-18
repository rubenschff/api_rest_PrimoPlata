import {IFinanceiroDTO} from "../../models";
import { Knex } from "../../knex";
import {ETableNames} from "../../ETableNames";


export const updateByUserId = async (id: number,financeiro: Omit<IFinanceiroDTO, 'id'|'usuarioId'>): Promise<void|Error> => {
    try {
        const update = await Knex(ETableNames.investimento).update(financeiro).where('usuarioId','=',id);

        if (update > 0) {
            return}

        return Error('Não foi possível atualizar o financeiro!');
    }catch (e) {
        console.log(e);
        return Error('Não foi possível atualizar o financeiro!');
    }
}