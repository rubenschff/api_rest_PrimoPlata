import {ITotalizadorDto} from "../../models/totalizador.dto";
import { Knex } from "../../knex";
import {ETableNames, TransacaoTotalizadorTable} from "../../ETableNames";


export const getById = async (usuario:number):Promise<ITotalizadorDto[]|Error> => {

    try {
            const totalizadorUsuario = await Knex(ETableNames.transacao_totalizador)
                .select<ITotalizadorDto[]>('*')
                .from(ETableNames.transacao_totalizador)
                .where(TransacaoTotalizadorTable.usuarioId,usuario)

            if (typeof totalizadorUsuario === 'object'){
                return totalizadorUsuario
            }

        return Error('Não foi possivel recuperar o registro')
    }catch (e) {
        console.log(e);
        return Error('Não foi possivel recuperar o registro')
    }
}