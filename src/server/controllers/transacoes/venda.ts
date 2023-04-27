import {TransacaoDTO} from "../../database/models/transacao.dto";
import {IFinanceiroDTO} from "../../database/models";


export const venda = (transacao: Omit<TransacaoDTO, 'id'>,financeiro: Omit<IFinanceiroDTO, 'id'>) => {
  
}