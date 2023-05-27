import {validation} from "../../shared/middleware";
import * as yup from "yup";
import {TransacaoDTO} from "../../database/models/transacao.dto";
import {Request,Response} from "express";
import {StatusCodes} from "http-status-codes";
import {TipoTransacao} from "../../database/enums";
import {FinanceiroProvider} from "../../database/providers/financeiro";
import {TransacaoController} from "./index";
import {TotalizadorProvider} from "../../database/providers/totalizador";
import {CookieDto} from "../../database/models";
import {JWTservice} from "../../shared/services/JWTservice";
import {FinanceiroTable} from "../../database/ETableNames";


interface IHeaderProperties extends CookieDto{

}
interface IBodyProps extends Omit<TransacaoDTO, 'id'|'usuarioId'|'log' > { }

export const transacaoValidation = validation((getSchema) => ({
    header: getSchema<IHeaderProperties>(yup.object().shape({
        authorization: yup.string().required(),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        investimentoId: yup.number().integer().required(),
        situacao: yup.number().integer().required().oneOf([1,2,3,4]),
        tipo: yup.number().integer().required().oneOf([1,2,3]),
        valorTransacao: yup.number().notRequired(),
        valorCota: yup.number().integer().notRequired(),
        quantidadeCotas: yup.number().integer().notRequired()
    })),
}));


export const transacao = async (req:Request<{},{},IBodyProps>, res:Response) => {

    const auth = JWTservice.verify(req.headers.authorization!)

    if (typeof auth === 'object'){

        const transacao:IBodyProps = req.body
        const totalizador = await TotalizadorProvider.getOrCreate({
            usuarioId: auth.uid,
            investimentoId: transacao.investimentoId
        })

        if (totalizador instanceof Error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                default: {
                    error: totalizador.message
                }
            })
        }

        const financeiro = await FinanceiroProvider.getByUserId(auth.uid)

        if (financeiro instanceof Error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                default: {
                    error: financeiro.message
                }
            })
        }

    //valida tipo de transação
    if (TipoTransacao.COMPRA == transacao.tipo) {

        //valida se há saldo disponível pra compra
        if ((financeiro.disponivel! < transacao.valorTransacao!) || (financeiro.disponivel! < transacao.valorCota!)) {
            return res.status(StatusCodes.BAD_REQUEST).json({erro: 'Saldo indisponível para compra!'})
        }

        const compra = await TransacaoController.compraVenda({...transacao, usuarioId:auth.uid}, financeiro, totalizador)

        if (compra instanceof Error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                default: {
                    error: compra.message
                }
            })
        }

        return res.status(StatusCodes.CREATED).json({
            result: `Compra registrada no valor de ${transacao.valorTransacao!.toFixed(2)}`
        });

    } else if (TipoTransacao.VENDA == transacao.tipo) {

        //valida se há saldo disponível pra venda
        if ((totalizador.valorAcumulado < transacao.valorTransacao!) || (totalizador.valorAcumulado < transacao.valorCota!)) {
            return res.status(StatusCodes.BAD_REQUEST).json({erro: 'Saldo indisponível para venda!'})
        }

        const venda = await TransacaoController
            .compraVenda({...transacao,usuarioId:auth.uid}, financeiro, totalizador)

        if (venda instanceof Error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                default: {
                    error: venda.message
                }
            })
        }

        return res.status(StatusCodes.CREATED).json({
            result: `Venda registrada no valor de ${transacao.valorTransacao!.toFixed(2)}`
        });

    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            default: {
                error: 'Dividendo não implementada'
            }
        })
    }

    }

    return res.status(StatusCodes.BAD_REQUEST).json(auth)

}