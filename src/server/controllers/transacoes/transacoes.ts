import {validation} from "../../shared/middleware";
import * as yup from "yup";
import {TransacaoDTO} from "../../database/models/transacao.dto";
import {Request,Response} from "express";
import {StatusCodes} from "http-status-codes";
import {InvestimentoFixoProvider} from "../../database/providers/investimento_compra_venda";
import {TipoTransacao} from "../../database/enums";
import {FinaceiroProvider} from "../../database/providers/financeiro";
import {TransacaoController} from "./index";
import {TotalizadorProvider} from "../../database/providers/totalizador";


interface IBodyProps extends Omit<TransacaoDTO, 'id' > { }

export const transacaoValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        usuarioId: yup.number().integer().required(),
        investimentoId: yup.number().integer().required(),
        situacao: yup.number().integer().required().oneOf([1,2,3,4]),
        tipo: yup.number().integer().required().oneOf([1,2,3]),
        valorTransacao: yup.number().notRequired(),
        valorCota: yup.number().integer().notRequired(),
        quantidadeCotas: yup.number().integer().notRequired()
    })),
}));


export const transacao = async (req:Request<{},{},IBodyProps>, res:Response) => {

    const investimento: Omit<TransacaoDTO, 'id'> = req.body

    const financeiro = await FinaceiroProvider.getByUserId(req.body.usuarioId)

    if (financeiro instanceof Error){
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: financeiro.message
            }
        })
    }

    //valida tipo de transação
    if (TipoTransacao.COMPRA == investimento.tipo){

        //valida se há saldo disponível pra compra
        if ((financeiro.disponivel! < investimento.valorTransacao!)||(financeiro.disponivel! < investimento.valorCota!)){
            return res.status(StatusCodes.BAD_REQUEST).json({erro:'Saldo indisponível para compra!'})
        }

        const compra = await TransacaoController.Compra(investimento)

        if (compra instanceof Error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                default:{
                    error: compra.message
                }
            })
        }

        await TotalizadorProvider.create({
            usuarioId: investimento.usuarioId,
            investimentoId: investimento.investimentoId
        })

        return res.status(StatusCodes.CREATED).json({result: `Compra ${compra[0].id} registrada`});

    }else if (TipoTransacao.VENDA == investimento.tipo){

        //valida se há saldo disponível pra venda
        if ((financeiro.disponivel! < investimento.valorTransacao!)||(financeiro.disponivel! < investimento.valorCota!)){
            return res.status(StatusCodes.BAD_REQUEST).json({erro:'Saldo indisponível para compra!'})
        }

        const venda = await TransacaoController.venda(investimento)

        if (venda instanceof Error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                default:{
                    error: venda.message
                }
            })
        }

        await TotalizadorProvider.create({
            usuarioId: investimento.usuarioId,
            investimentoId: investimento.investimentoId
        })

        return res.status(StatusCodes.CREATED).json({result: `Venda ${venda[0].id} registrada`});

    }else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: 'Dividendo não implementada'
            }
        })
    }

}