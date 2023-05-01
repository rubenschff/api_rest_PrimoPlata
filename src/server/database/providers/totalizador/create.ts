import {ITotalizadorDto} from "../../models/totalizador.dto";
import {Knex} from "../../knex";
import {ETableNames, TransacaoTotalizadorTable} from "../../ETableNames";


export const create = async (totalizador: Omit<ITotalizadorDto, 'id'|'quantidadeCotas'|'valorInicial'|'valorAcumulado'>):Promise<number|Error> => {
    try {
        console.log(totalizador)
        const totalizadorExiste = await Knex(ETableNames.transacao_totalizador)
                     .select<ITotalizadorDto[]>('*')
                      .where(TransacaoTotalizadorTable.usuarioId,totalizador.usuarioId)
                       .where(TransacaoTotalizadorTable.investimentoId,totalizador.investimentoId)


        if (totalizadorExiste.length == 0){
           const insert = await Knex(ETableNames.transacao_totalizador).insert(totalizador).returning<[{id:number}]>(TransacaoTotalizadorTable.id)
            if (typeof insert === "object"){
                return insert[0].id
            }
            return Error('Não foi possivel criar o totalizador!')
        }

        return Error('Totalizador ja existe!')

    }catch (e) {
        console.error(e)
        return Error('Não foi possivel recuperar o totalizador!')
    }
}