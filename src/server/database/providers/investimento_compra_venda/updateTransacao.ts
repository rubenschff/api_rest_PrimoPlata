import {TransacaoDTO} from "../../models/transacao.dto";
import {Knex} from "../../knex";
import {ETableNames, TransacaoTable} from "../../ETableNames";
import {IProcesarInvestimentos} from "../../models";


interface UpdateTransacao extends Omit<IProcesarInvestimentos, 'valor'>{
    valor?:number
}

export const updateTransacao = async (transacao:UpdateTransacao[]) => {
        try {

            const updated = transacao.map(async transacao => {
                delete transacao.valor
                const result = await Knex(ETableNames.transacao).update(transacao).where(TransacaoTable.id, transacao.id)
                    .catch(e =>{
                        return Error(e)
                    });
                return result
            })

            console.log(updated)


        }catch (e) {
            console.log(e)
        }
}