import {IFinanceiroDTO} from "../../models";
import { Knex } from "../../knex";
import {ETableNames, FinanceiroTable} from "../../ETableNames";


export const updateByUserId = async (id: number,financeiro: Omit<IFinanceiroDTO, 'id'|'usuarioId'>): Promise<IFinanceiroDTO|Error> => {
    try {
        const update = await Knex(ETableNames.financeiro).update(financeiro).where('usuarioId',id)
            .returning<IFinanceiroDTO>([
                FinanceiroTable.arrecadado,
                FinanceiroTable.disponivel,
                FinanceiroTable.acumulado
            ]);

        if (typeof update === 'object') {
            return update}

        return Error('Não foi possível atualizar o financeiro!');
    }catch (e) {
        console.log(e);
        return Error('Não foi possível atualizar o financeiro!');
    }
}