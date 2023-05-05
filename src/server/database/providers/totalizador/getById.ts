import {ITotalizadorDto} from "../../models/totalizador.dto";
import { Knex } from "../../knex";
import {ETableNames, TransacaoTotalizadorTable} from "../../ETableNames";


export const getById = async (usuario:number):Promise<ITotalizadorDto[]|Error> => {

    try {
            const totalizadorUsuario = await Knex(ETableNames.transacao_totalizador)
                .select<ITotalizadorDto[]>([
                    TransacaoTotalizadorTable.id,
                    TransacaoTotalizadorTable.usuarioId,
                    TransacaoTotalizadorTable.investimentoId,
                    TransacaoTotalizadorTable.valorInicial,
                    TransacaoTotalizadorTable.valorAcumulado,
                    TransacaoTotalizadorTable.quantidadeCotas
                ])
                .from(ETableNames.transacao_totalizador)
                .where(TransacaoTotalizadorTable.usuarioId,usuario)

            if (totalizadorUsuario.length > 0){
                return totalizadorUsuario
            }

        return Error('Não foi possivel recuperar o registro')
    }catch (e) {
        console.log(e);
        return Error('Não foi possivel recuperar o registro')
    }
}