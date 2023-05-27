import {IFinanceiroDTO} from "../../models";
import {Knex} from "../../knex";
import {ETableNames, FinanceiroTable} from "../../ETableNames";
import {TotalizadorProvider} from "../totalizador";


export const getByUserId = async (userId: number): Promise< IFinanceiroDTO | Error > => {
        try {
            const financeiro:IFinanceiroDTO[] = await Knex(ETableNames.financeiro)
                .select(
                    FinanceiroTable.id,
                    FinanceiroTable.arrecadado,
                    FinanceiroTable.acumulado,
                    FinanceiroTable.disponivel,
                    FinanceiroTable.compras,
                    FinanceiroTable.vendas,
                    FinanceiroTable.usuarioId
                )
                .where('usuarioId',userId);



            const totalizadores = await TotalizadorProvider.getById(userId, 0)


            if (totalizadores instanceof Error){
                return totalizadores
            }

            financeiro[0].acumulado = 0
            totalizadores.map(totalizador => {
                financeiro[0].acumulado! += totalizador.valorAcumulado == undefined ? 0 : totalizador.valorAcumulado
            })




            if (financeiro) return financeiro[0];

            return Error("Não foi possivel recuperar os registro")
        }catch (e) {
            console.log(e);
            return Error("Não foi possivel recuperar os registro")
        }
}