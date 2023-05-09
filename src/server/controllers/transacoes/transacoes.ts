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


interface IHeaderProperties extends CookieDto{

}
interface IBodyProps extends Omit<TransacaoDTO, 'id'|'usuarioId' > { }

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

    if (!req.headers.authorization) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            default: {
                error: 'O token precisa ser informado no header'
            }
        })
    }

    const auth = JWTservice.verify(req.headers.authorization!)

    if (typeof auth === 'object'){


    const investimento:IBodyProps = req.body

    //valida tipo de transação
    if (TipoTransacao.COMPRA == investimento.tipo) {

        const financeiro = await FinanceiroProvider.getByUserId(auth.uid)

        if (financeiro instanceof Error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                default: {
                    error: financeiro.message
                }
            })
        }

        //valida se há saldo disponível pra compra
        if ((financeiro.disponivel! < investimento.valorTransacao!) || (financeiro.disponivel! < investimento.valorCota!)) {
            return res.status(StatusCodes.BAD_REQUEST).json({erro: 'Saldo indisponível para compra!'})
        }

        const compra = await TransacaoController.Compra({...investimento, usuarioId:auth.uid})

        if (compra instanceof Error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                default: {
                    error: compra.message
                }
            })
        }

        await TotalizadorProvider.create({
            usuarioId: auth.uid,
            investimentoId: investimento.investimentoId
        })

        return res.status(StatusCodes.CREATED).json({result: `Compra ${compra[0].id} registrada`});

    } else if (TipoTransacao.VENDA == investimento.tipo) {


        const totalizador = await TotalizadorProvider.create({
            usuarioId: auth.uid,
            investimentoId: investimento.investimentoId
        })

        if (totalizador instanceof Error) {
            return res.status(StatusCodes.BAD_REQUEST).json({erro: 'Não foi possivel recuperar o totalizador para comparação'})
        }


        //valida se há saldo disponível pra venda
        if ((totalizador.valorAcumulado < investimento.valorTransacao!) || (totalizador.valorAcumulado < investimento.valorCota!)) {
            return res.status(StatusCodes.BAD_REQUEST).json({erro: 'Saldo indisponível para venda!'})
        }

        const venda = await TransacaoController.venda({...investimento,usuarioId:auth.uid})

        if (venda instanceof Error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                default: {
                    error: venda.message
                }
            })
        }

        return res.status(StatusCodes.CREATED).json({result: `Venda ${venda[0].id} registrada`});

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