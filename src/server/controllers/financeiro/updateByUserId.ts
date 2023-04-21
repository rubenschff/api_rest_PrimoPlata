
import {validation} from "../../shared/middleware";
import * as yup from "yup";
import { Request, RequestHandler, Response, query, request } from "express";
import {IFinanceiroDTO} from "../../database/models";
import {StatusCodes} from "http-status-codes";
import { ComparativoProvider} from "../../database/providers/financeiro";
import {JWTservice} from "../../shared/services/JWTservice";

interface IHeaderProperties {
    id : number;
}
interface IBodyPropeties extends Omit<IFinanceiroDTO, 'id'|'usuarioId'>{ }

export const updateByIdValidation = validation((getSchema) => ({
    header: getSchema<IHeaderProperties>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyPropeties>(yup.object().shape({
        arrecadado: yup.number().notRequired().moreThan(0),
        acumulado: yup.number().notRequired().moreThan(0),
        disponivel: yup.number().notRequired().moreThan(0),
    })),
}));
export const updateByUserId = async (req: Request<IHeaderProperties,{},IBodyPropeties>,res:Response) => {

    if (!req.headers.authorization){
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: 'O token precisa ser informado no header'
            }
        })
    }


    const auth = await JWTservice.verify(req.headers.authorization)

    if (typeof auth === 'object'){
        const update = await ComparativoProvider.updateByUserId(auth.uid,req.body);
        console.log(update);
        if(update instanceof Error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                default:{
                    error: update.message
                }
            });
        }
        return res.status(StatusCodes.OK).json(update);
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        default:{
            error: auth
        }
    });

}