import {validation} from "../../shared/middleware";
import * as yup from "yup";
import {InvestirDto} from "../../database/models/investir.dto";
import {Request,Response} from "express";
import {StatusCodes} from "http-status-codes";


interface IBodyProps extends Omit<InvestirDto, 'id' > { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        usuarioId: yup.number().integer().required(),
        investimentoId: yup.number().integer().required(),
        situacao: yup.number().integer().required(),
        tipo: yup.number().integer().required(),
        valorTransacao: yup.number().integer().notRequired(),
        valorCota: yup.number().integer().notRequired(),
        quantidadeCotas: yup.number().integer().notRequired()
    })),
}));


export const compra = (req:Request<{},{},IBodyProps>,res:Response) => {

        const investimento: Omit<InvestirDto, 'id'> = req.body

    if (investimento.investimentoId > 3) {
        if (!investimento.quantidadeCotas || !investimento.valorCota) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                errors: {
                    default: 'quantidadeCotas e valorCota precisam ser informados em investimentos variáveis!'
                }
            });
        } else {
            const InvestimentoVariavel = {}//todo Service de investimento variavel

        }

    }else {
        const InvestimentoFixo = {}//todo Service de investimento fixo
    }
}