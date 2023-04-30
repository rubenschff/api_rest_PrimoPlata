import {TransacaoDTO} from "../../database/models/transacao.dto";
import {InvestimentoController} from "../investimentos";
import {InvestimentoFixoProvider} from "../../database/providers/investimento_compra_venda";


export const venda = async (transacao: Omit<TransacaoDTO, 'id'>) => {
    if (transacao.investimentoId <= 3) {

        if(!transacao.valorTransacao){
            return Error('valorTransacao precisa ser informado para investimentos fixos!');
        }

       return await InvestimentoFixoProvider.venda_fixos(transacao)

    }else {
        if (!transacao.quantidadeCotas || !transacao.valorCota) {
            return Error('quantidadeCotas e valorCota precisam ser informados em investimentos variáveis!');
        }
        return Error('compra de transação variavel não implementado')//todo Service de investimento variavel
    }
}