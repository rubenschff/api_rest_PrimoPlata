import {TransacaoDTO} from "../../database/models/transacao.dto";
import {TransacaoFixoProvider} from "../../database/providers/investimento_compra_venda";

export const Compra = async (investimento: Omit<TransacaoDTO, 'id'>) => {
    if (investimento.investimentoId <= 3) {
        if(!investimento.valorTransacao){
            return Error('valorTransacao precisa ser informado para investimentos fixos!');
        }

        return await TransacaoFixoProvider.compra_fixos(investimento)

    }else {
        if (!investimento.quantidadeCotas || !investimento.valorCota) {
            return Error('quantidadeCotas e valorCota precisam ser informados em investimentos variáveis!');
        }
         return Error('compra de transação variavel não implementado')//todo Service de investimento variavel
    }
}