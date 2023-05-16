import {CookieDto} from "../../database/models";
import {validation} from "../../shared/middleware";
import * as yup from "yup";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {JWTservice} from "../../shared/services/JWTservice";
import {TotalizadorProvider} from "../../database/providers/totalizador";

interface IParamProperties extends CookieDto{ }

interface IQueryProperties {
    id? : number;
}

export const getByIdValidation = validation((getSchema) => ({
    header: getSchema<IParamProperties>(yup.object().shape({
        authorization: yup.string().required()
    })),
    query: getSchema<IQueryProperties>(yup.object().shape({
        id: yup.number().integer().notRequired().default(0),
    })),
}));
export const getByUserId = async (req: Request<IParamProperties,{},{},IQueryProperties>, res: Response) => {

    if (!req.headers.authorization){
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: 'O token precisa ser informado no header'
            }
        })
    }

    const auth = JWTservice.verify(req.headers.authorization!)

    if (typeof auth === 'object'){
        const investimentosUsuario = await TotalizadorProvider.getById(auth.uid,req.query.id || 0)
        console.log(investimentosUsuario);
        if(investimentosUsuario instanceof Error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                default:{
                    error: investimentosUsuario.message
                }
            });
        }
        return res.status(StatusCodes.OK).json(investimentosUsuario);
    }

    return res.status(StatusCodes.UNAUTHORIZED).json(auth)
}