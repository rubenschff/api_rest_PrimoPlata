import {IFinanceiroDTO} from "../../models";
import {Knex} from "../../knex";
import {ETableNames, FinanceiroTable} from "../../ETableNames";


export const getByUserId = async (userId: number): Promise< IFinanceiroDTO[] | Error > => {
        try {
            const result:IFinanceiroDTO[] = await Knex(ETableNames.financeiro)
                .select(
                    FinanceiroTable.id,
                    FinanceiroTable.arrecadado,
                    FinanceiroTable.acumulado,
                    FinanceiroTable.disponivel,
                    FinanceiroTable.usuarioId
                )
                .where('usuarioId',userId);

            if (result) return result;

            return Error("Não foi possivel recuperar os registro")
        }catch (e) {
            console.log(e);
            return Error("Não foi possivel recuperar os registro")
        }
}