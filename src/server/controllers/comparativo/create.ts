import * as yup from "yup"
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {IComparativoDTO} from "../../database/models";
import {validation} from "../../shared/middleware";
import {ComparativoProvider} from "../../database/providers/comparativo";


interface IBodyProps extends Omit<IComparativoDTO, 'id' > { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        moedasDisponiveis: yup.number().notRequired().default(0),
        moedasRecebidas: yup.number().notRequired().default(0),
        moedasTotais: yup.number().notRequired().default(0),
        usuarioId: yup.number().integer().required().moreThan(0),

    })),
}));

export const create = async (req: Request<{},{},IBodyProps>, res: Response) =>{
    const result = await ComparativoProvider.create(req.body)

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
    }


    return res.status(StatusCodes.CREATED).json(`ID do comparativo = ${result}`);
}