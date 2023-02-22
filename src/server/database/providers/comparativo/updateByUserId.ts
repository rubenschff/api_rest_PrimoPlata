import {IComparativoDTO} from "../../models/comparativo/ComparativoDTO";
import {knex} from "knex";
import {ETableNames} from "../../ETableNames";


export const updateByUserId = async (id: number,comparativo: Omit<IComparativoDTO, 'id'|'usuarioId'>): Promise<void|Error> => {
    try {
        const update = await knex(ETableNames.comparacao).where('usuarioId','=',id).update(comparativo);

        if (update > 0) {
            return} ;

        return Error('Não foi possível atualizar o comparativo!');
    }catch (e) {
        console.log(e);
        return Error('Não foi possível atualizar o comparativo!');
    }
}