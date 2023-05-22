import {ETableNames, InvestimentoTable} from "../../ETableNames";
import { Knex } from "../../knex";
import { IinvestimentoDTO } from "../../models";

export const getAll = async (page: number, limit: number, filter: string, id: number ): Promise<IinvestimentoDTO[]|Error> => {
    try {
        let result:any[] = []
        if(id != 0){
             result = await Knex(ETableNames.investimento)
                .join('investimento_fixo','investimento_fixo.investimentoId','=','investimento.id')
                .select(
                    "investimento.id",
                    "investimento.descricao",
                    "investimento.explicacao",
                    "investimento.risco",
                    "investimento.liquidez",
                    "investimento.imagem",
                    "investimento_fixo.juro",
                    "investimento_fixo.aporteInicial",
                    "investimento_fixo.diaParaCreditar"
                )
                .where("investimento.id", Number(id))
                .offset((page -1) * limit,)
                .limit(limit);
        }else {
             result = await Knex(ETableNames.investimento)
                .join('investimento_fixo','investimento_fixo.investimentoId','=','investimento.id')
                .select(
                    "investimento.id",
                    "investimento.descricao",
                    "investimento.explicacao",
                    "investimento.risco",
                    "investimento.liquidez",
                    "investimento.imagem",
                    "investimento_fixo.juro",
                    "investimento_fixo.aporteInicial",
                    "investimento_fixo.diaParaCreditar"
                )
                .where("investimento.id", Number(id))
                .orWhere(InvestimentoTable.descricao, 'like', `%${filter}%`)
                .offset((page -1) * limit,)
                .limit(limit);
        }

        return result;

    } catch (error) {
        console.log(error);
        return Error('Houve um erro ao recuperar os registros');
    }
}