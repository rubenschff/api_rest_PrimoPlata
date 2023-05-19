import {IFinanceiroDTO} from "../../models";
import {Knex} from "../../knex";
import {ETableNames, FinanceiroTable} from "../../ETableNames";
import {TotalizadorProvider} from "../totalizador";


export const getByUserId = async (userId: number): Promise< IFinanceiroDTO | Error > => {
        try {
            const result:IFinanceiroDTO[] = await Knex(ETableNames.financeiro)
                .select(
                    FinanceiroTable.arrecadado,
                    FinanceiroTable.acumulado,
                    FinanceiroTable.disponivel,
                    FinanceiroTable.compras,
                    FinanceiroTable.vendas
                )
                .where('usuarioId',userId);

            const totalizadores = await TotalizadorProvider.getById(userId, 0)

            if (totalizadores instanceof Error){
                return totalizadores
            }

            let acumulado:number = 0

            totalizadores.map(totalizador => {
                acumulado += totalizador.valorAcumulado == undefined ? 0 : totalizador.valorAcumulado
            })



            if (result) return {...result[0], acumulado: acumulado};

            return Error("Não foi possivel recuperar os registro")
        }catch (e) {
            console.log(e);
            return Error("Não foi possivel recuperar os registro")
        }
}