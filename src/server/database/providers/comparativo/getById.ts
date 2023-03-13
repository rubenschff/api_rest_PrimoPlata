import {IComparativoDTO} from "../../models/comparativo/ComparativoDTO";
import {Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";


export const getByUserId = async (userId: number): Promise< IComparativoDTO[] | Error > => {
        try {
            const result:IComparativoDTO[] = await Knex(ETableNames.comparacao)
                .select("id","moedasRecebidas","moedasTotais","moedasDisponiveis","usuarioId")
                .where('usuarioId',userId);

            if (result) return result;

            return Error("Não foi possivel recuperar os registro")
        }catch (e) {
            console.log(e);
            return Error("Não foi possivel recuperar os registro")
        }
}