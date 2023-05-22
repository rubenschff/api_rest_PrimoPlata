import {ITotalizadorDto} from "../../models/totalizador.dto";
import {Knex} from "../../knex";
import {ETableNames, TransacaoTotalizadorTable} from "../../ETableNames";


export const updateById = async (totalizador:ITotalizadorDto) =>{

   try {

       const update = Knex(ETableNames.transacao_totalizador)
           .update(totalizador)
           .where(TransacaoTotalizadorTable.id, totalizador.id)
           .catch(e =>{
               return Error(e)
           })

       if (update instanceof Error) return update

       console.log(update)
       return update



   }catch (e) {
       console.error(e)
   }

}