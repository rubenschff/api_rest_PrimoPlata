import {ITotalizadorDto} from "../../models/totalizador.dto";
import {Knex} from "../../knex";
import {ETableNames, TransacaoTotalizadorTable} from "../../ETableNames";


export const create = async (totalizador: Omit<ITotalizadorDto, 'id'|'quantidadeCotas'|'valorInicial'|'valorAcumulado'>):Promise<ITotalizadorDto|Error> => {
    try {
        console.log(totalizador)
        const totalizadorExiste = await Knex(ETableNames.transacao_totalizador)
                     .select<ITotalizadorDto[]>('*')
                      .where(TransacaoTotalizadorTable.usuarioId,totalizador.usuarioId)
                       .where(TransacaoTotalizadorTable.investimentoId,totalizador.investimentoId)

        if (totalizadorExiste.length > 0){
            return totalizadorExiste[0]
        }


        const insertTotalizador = await Knex(ETableNames.transacao_totalizador)
            .insert(totalizador)
            .returning<ITotalizadorDto[]>('*')

        if (insertTotalizador.length > 0){
            return insertTotalizador[0]
        }

        return Error('Não foi possivel criar o totalizador!')



    }catch (e) {
        console.error(e)
        return Error('Não foi possivel recuperar o totalizador!')
    }
}