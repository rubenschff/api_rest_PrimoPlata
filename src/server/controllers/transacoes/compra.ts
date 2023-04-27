import {InvestirDto} from "../../database/models/investir.dto";
import {StatusCodes} from "http-status-codes";
import {InvestimentoFixoProvider} from "../../database/providers/investimento_compra_venda";
import {Response} from "express";
import {IFinanceiroDTO} from "../../database/models";

export const Compra = async (investimento: Omit<InvestirDto, 'id'>, financeiro:Omit<IFinanceiroDTO, 'id'>) => {
    if (investimento.investimentoId <= 3) {
        if(!investimento.valorTransacao){
            return Error('valorTransacao precisa ser informado para investimentos fixos!');
        }

        return await InvestimentoFixoProvider.compra(investimento,financeiro)

    }else {
        if (!investimento.quantidadeCotas || !investimento.valorCota) {
            return Error('quantidadeCotas e valorCota precisam ser informados em investimentos variáveis!');
        }
         return Error('compra de transação variavel não implementado')//todo Service de investimento variavel
    }
}