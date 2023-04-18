
import {validation} from "../../shared/middleware";
import * as yup from "yup";
import { Request, RequestHandler, Response, query, request } from "express";
import {IFinanceiroDTO} from "../../database/models";
import {StatusCodes} from "http-status-codes";
import { ComparativoProvider} from "../../database/providers/financeiro";

interface IParamProperties {
    id : number;
}
interface IBodyPropeties extends Omit<IFinanceiroDTO, 'id'|'usuarioId'>{ }

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProperties>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyPropeties>(yup.object().shape({
        arrecadado: yup.number().notRequired().moreThan(0),
        acumulado: yup.number().notRequired().moreThan(0),
        disponivel: yup.number().notRequired().moreThan(0),
    })),
}));
export const updateByUserId = async (req: Request<IParamProperties,{},IBodyPropeties>,res:Response) => {

    if (!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: 'O campo "Id" precisa ser informado na URL.'
            }
        })
    }

    const update = await ComparativoProvider.updateByUserId(req.params.id,req.body);

    if(update instanceof Error){
        console.log(update);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            default:{
                error: update.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json({default: 'Comparativo atualizado'})
}