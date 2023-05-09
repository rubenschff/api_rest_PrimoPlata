
import {validation} from "../../shared/middleware";
import * as yup from "yup";
import { Request, Response } from "express";
import {CookieDto, IFinanceiroDTO} from "../../database/models";
import {StatusCodes} from "http-status-codes";
import { FinanceiroProvider} from "../../database/providers/financeiro";
import {JWTservice} from "../../shared/services/JWTservice";

interface IHeaderProperties extends CookieDto{ }
interface IBodyPropeties extends Omit<IFinanceiroDTO, 'id'|'usuarioId'>{ }

export const updateByIdValidation = validation((getSchema) => ({
    header: getSchema<IHeaderProperties>(yup.object().shape({
        authorization: yup.string().required(),
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
        const update = await FinanceiroProvider.updateByUserId(auth.uid,req.body);
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