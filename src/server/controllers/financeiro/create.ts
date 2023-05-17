import * as yup from "yup"
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {IFinanceiroDTO} from "../../database/models";
import {validation} from "../../shared/middleware";
import {FinanceiroProvider} from "../../database/providers/financeiro";


interface IBodyProps extends Omit<IFinanceiroDTO, 'id' > { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        arrecadado: yup.number().notRequired().default(0),
        acumulado: yup.number().notRequired().default(0),
        disponivel: yup.number().notRequired().default(0),
        compras: yup.number().notRequired().default(0),
        vendas: yup.number().notRequired().default(0),
        usuarioId: yup.number().integer().required().moreThan(0),

    })),
}));

export const create = async (req: Request<{},{},IBodyProps>, res: Response) =>{
    const result = await FinanceiroProvider.create(req.body)

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
    }


    return res.status(StatusCodes.CREATED).json(`ID do comparativo = ${result}`);
}