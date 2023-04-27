import {validation} from "../../shared/middleware";
import * as yup from "yup";
import {InvestirDto} from "../../database/models/investir.dto";
import {Request,Response} from "express";
import {StatusCodes} from "http-status-codes";
import {InvestimentoFixoProvider} from "../../database/providers/investimento_compra_venda";
import {TipoTransacao} from "../../database/enums";
import {Compra} from "./compra";
import {FinaceiroProvider} from "../../database/providers/financeiro";


interface IBodyProps extends Omit<InvestirDto, 'id' > { }

export const transacaoValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        usuarioId: yup.number().integer().required(),
        investimentoId: yup.number().integer().required(),
        situacao: yup.number().integer().required().oneOf([1,2,3,4]),
        tipo: yup.number().integer().required().oneOf([1,2,3]),
        valorTransacao: yup.number().integer().notRequired(),
        valorCota: yup.number().integer().notRequired(),
        quantidadeCotas: yup.number().integer().notRequired()
    })),
}));


export const transacao = async (req:Request<{},{},IBodyProps>, res:Response) => {

    const investimento: Omit<InvestirDto, 'id'> = req.body

    const financeiro = await FinaceiroProvider.getByUserId(req.body.usuarioId)

    if (financeiro instanceof Error){
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: financeiro.message
            }
        })
    }

    if (TipoTransacao.COMPRA == investimento.tipo){

        if ((financeiro.disponivel! < investimento.valorTransacao!)||(financeiro.disponivel! < investimento.valorCota!)){
            return res.status(StatusCodes.BAD_REQUEST).json({erro:'Saldo indisponível para compra!'})
        }

        const compra = await Compra(investimento,financeiro)

        if (compra instanceof Error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                default:{
                    error: compra.message
                }
            })
        }

        return res.status(StatusCodes.CREATED).json(compra);

    }else if (TipoTransacao.VENDA == investimento.tipo){
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: 'Venda não implementada'
            }
        })
    }else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: 'Dividendo não implementada'
            }
        })
    }

}