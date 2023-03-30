import {validation} from "../../shared/middleware";
import * as yup from "yup";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {UsuarioProvider} from "../../database/providers/usuario";
import {ComparativoProvider} from "../../database/providers/comparativo";
import {CookieDto} from "../../database/models";
import {JWTservice} from "../../shared/services/JWTservice";

interface IParamProperties extends CookieDto{ }
export const getByUserIdValidation = validation((getSchema) => ({
    header: getSchema<IParamProperties>(yup.object().shape({
        authorization: yup.string().required(),
    }))
}));
export const getByUserId = async (req: Request<IParamProperties>, res: Response) => {

    if (!req.headers.authorization){
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: 'O token precisa ser informado no header'
            }
        })
    }

    const auth = JWTservice.verify(req.headers.authorization)

    if (typeof auth === 'object'){
        const getComparativo = await ComparativoProvider.getByUserId(auth.uid);
        console.log(getComparativo);
        if(getComparativo instanceof Error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                default:{
                    error: getComparativo.message
                }
            });
        }
        return res.status(StatusCodes.OK).json(getComparativo);
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        default:{
            error: auth
        }
    });

};