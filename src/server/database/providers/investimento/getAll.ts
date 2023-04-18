import {ETableNames, InvestimentoTable} from "../../ETableNames";
import { Knex } from "../../knex";
import { IinvestimentoDTO } from "../../models";

export const getAll = async (page: number, limit: number, filter: string, id: number ): Promise<IinvestimentoDTO[]|Error> => {
    try {

        const result = await Knex(ETableNames.investimento)
        .select(
            InvestimentoTable.id,
            InvestimentoTable.descricao,
            InvestimentoTable.explicacao,
            InvestimentoTable.risco,
            InvestimentoTable.liquidez,
            InvestimentoTable.imagem)
        .where(InvestimentoTable.id, Number(id))
        .orWhere(InvestimentoTable.descricao, 'like', `%${filter}%`)
        .offset((page -1) * limit,)
        .limit(limit);

        if(id>0 && result.every(item => item.id !== id)){
            const resultByID = await Knex(ETableNames.investimento)
            .select('*')
            .where(InvestimentoTable.id, '=', id)
            .first();

            if (resultByID) return [...result, resultByID]; 
        }

        return result;
    } catch (error) {
        console.log(error);
        return Error('Houve um erro ao recuperar os registros');
    }
}