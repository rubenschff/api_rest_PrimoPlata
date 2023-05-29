import {TransacaoDTO} from "../../database/models/transacao.dto";
import {TransacaoFixoProvider} from "../../database/providers/transacoes";
import {IFinanceiroDTO, IinvestimentoDTO} from "../../database/models";
import {ITotalizadorDto} from "../../database/models/totalizador.dto";
import {SituacaoTransacao, TipoTransacao} from "../../database/enums";
import {FinanceiroProvider} from "../../database/providers/financeiro";
import {TotalizadorProvider} from "../../database/providers/totalizador";

export const compraVenda = async (transacao: Omit<TransacaoDTO, 'id'>, financeiro: IFinanceiroDTO, totalizador: ITotalizadorDto) => {
    if (transacao.investimentoId <= 3) {

        //dados não necessários pra investimentos fixos
        delete transacao.valorCota
        delete transacao.quantidadeCotas

        if(!transacao.valorTransacao){
            return Error('valorTransacao precisa ser informado para investimentos fixos!');
        }

        if (transacao.tipo == TipoTransacao.COMPRA){
            return compra(transacao, financeiro, totalizador)
        }else {
            return venda(transacao, financeiro, totalizador)
        }



    }else {
        if (!transacao.quantidadeCotas || !transacao.valorCota) {
            return Error('quantidadeCotas e valorCota precisam ser informados em investimentos variáveis!');
        }
         return Error('compra de transação variavel não implementado')//todo Service de investimento variavel
    }
}


async function compra (transacao: Omit<TransacaoDTO, 'id'>, financeiro: IFinanceiroDTO, totalizador: ITotalizadorDto){

    console.log(transacao)
    console.log(financeiro)
    console.log(totalizador)

    if (financeiro.disponivel! >= transacao.valorTransacao!){

        transacao.situacao = SituacaoTransacao.CONCLUIDO
        transacao.log = {
            status:`CONCLUIDO, saldo disponível R$${financeiro.disponivel} valor da compra R$${transacao.valorTransacao}`
        }

        totalizador!.valorInicial +=  transacao.valorTransacao!;
        totalizador!.valorAcumulado +=   transacao.valorTransacao!;
        financeiro.acumulado! += transacao.valorTransacao!;
        financeiro.disponivel! -= transacao.valorTransacao!;
    }else {

        transacao.situacao = SituacaoTransacao.CONCLUIDO
        transacao.log = {
            status:`CANCELADO, saldo disponível R$${financeiro.disponivel} valor da compra R$${transacao.valorTransacao}`
        }

    }

    console.log('-------------------------------------------------COMPRA-------------------------------------------------')
    console.log(transacao)
    console.log(financeiro)
    console.log(totalizador)

    await TotalizadorProvider.updateById(totalizador)
    await FinanceiroProvider.updateByUserId(financeiro.usuarioId, financeiro)
    await TransacaoFixoProvider.register_CompraVendaFixa(transacao)

}

async function venda (transacao: Omit<TransacaoDTO, 'id'>, financeiro: IFinanceiroDTO, totalizador: ITotalizadorDto){

    console.log(transacao)
    console.log(financeiro)
    console.log(totalizador)

    if(totalizador!.valorAcumulado >= transacao.valorTransacao!){
        const aux = totalizador!.valorAcumulado - transacao.valorTransacao!

        if (aux < totalizador!.valorInicial){
            totalizador!.valorInicial = aux
        }

        transacao.situacao = SituacaoTransacao.CONCLUIDO
        transacao.log = {
            status:`CONCLUIDO, saldo acumulado R$${totalizador!.valorAcumulado} valor da venda R$${transacao.valorTransacao?.toFixed(2)}`
        }

        financeiro.acumulado! -= transacao.valorTransacao!;
        financeiro.disponivel! += transacao.valorTransacao!
        totalizador!.valorAcumulado -= transacao.valorTransacao!

    }else {

        transacao.situacao = SituacaoTransacao.CANCELADO
        transacao.log = {
            status:`CANCELADO, saldo acumulado R$${totalizador!.valorAcumulado} valor da venda R$${transacao.valorTransacao?.toFixed(2)}`
        }

    }

    console.log('-------------------------------------------------VENDA-------------------------------------------------')
    console.log(transacao)
    console.log(financeiro)
    console.log(totalizador)

    await TotalizadorProvider.updateById(totalizador)
    await FinanceiroProvider.updateByUserId(financeiro.usuarioId, financeiro)
    await TransacaoFixoProvider.register_CompraVendaFixa(transacao)

}