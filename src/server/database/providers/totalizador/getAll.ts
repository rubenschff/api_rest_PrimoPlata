import {Knex} from "../../knex";
import {ETableNames, TransacaoTotalizadorTable} from "../../ETableNames";
import {ITotalizadorDto} from "../../models/totalizador.dto";


export async function getAll (investimentoId: number):Promise<ITotalizadorDto[]>{

    return  Knex(ETableNames.transacao_totalizador)
        .select<ITotalizadorDto[]>([
            TransacaoTotalizadorTable.id,
            TransacaoTotalizadorTable.usuarioId,
            TransacaoTotalizadorTable.investimentoId,
            TransacaoTotalizadorTable.valorInicial,
            TransacaoTotalizadorTable.valorAcumulado,
            TransacaoTotalizadorTable.quantidadeCotas
        ])
        .where(TransacaoTotalizadorTable.investimentoId, investimentoId)
        .where(TransacaoTotalizadorTable.valorAcumulado, '>', 0)

}