import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { InvestimentoProvider } from "../../database/providers/investimento";
import {CookieDto, IinvestimentoDTO} from "../../database/models";
import {JWTservice} from "../../shared/services/JWTservice";
import {ITotalizadorDto} from "../../database/models/totalizador.dto";
import {TotalizadorProvider} from "../../database/providers/totalizador";

interface IHeaderProperties extends CookieDto{ }

interface Investimentos extends IinvestimentoDTO{
    totalizador?: ITotalizadorDto | Error
}

interface IQueryProperties {
  id? : number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
    header: getSchema<IHeaderProperties>(yup.object().shape({
        authorization: yup.string().required(),
    })),
    query: getSchema<IQueryProperties>(yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    id: yup.number().integer().notRequired().default(0),
    filter: yup.string().notRequired(),
  })),
}));

//cria o usuário
export const getAll = async (req: Request<{}, {}, {},IQueryProperties>, res: Response) => {

    if (!req.headers.authorization) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            default: {
                error: 'O token precisa ser informado no header'
            }
        })
    }

    const auth = JWTservice.verify(req.headers.authorization!)

    if (typeof auth ==='object'){

        const result:Investimentos[]|Error = await InvestimentoProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filter || '', Number(req.query.id) || 0);
        if(result instanceof Error){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                default:{
                    error: result.message
                }
            });
        }


        for (let i in result){
            result[i].totalizador = await TotalizadorProvider.getOrCreate({
                investimentoId: result[i].id,
                usuarioId: auth.uid
            })
        }

        res.setHeader('access-control-expose-headers', 'x-total-count');
        res.setHeader('x-total-count','count')

        return res.status(StatusCodes.OK).json(result);
    }

};
