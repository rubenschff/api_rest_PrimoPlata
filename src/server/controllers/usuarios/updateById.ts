import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import {CookieDto, IUsuario} from "../../database/models";
import { UsuarioProvider } from "../../database/providers/usuario";
import {JWTservice} from "../../shared/services/JWTservice";

interface IHeaderProperties extends CookieDto{ }

interface IBodyPropeties extends Omit<IUsuario, 'id' | 'dateOfBirth'|'accessToken'>{ }

export const updateByIdValidation = validation((getSchema) => ({
  header: getSchema<IHeaderProperties>(yup.object().shape({
    authorization: yup.string().required(),
  })),
  body: getSchema<IBodyPropeties>(yup.object().shape({
    name: yup.string().notRequired().min(3).max(150),
    nickName: yup.string().notRequired().min(6),
    password: yup.string().notRequired().min(4),
  })),
}));

//cria o usuário
export const updateById = async (req: Request<IHeaderProperties,{},IBodyPropeties>, res: Response) => {

    if (!req.headers.authorization){
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: 'O token precisa ser informado no header'
            }
        })
    }

    const auth = JWTservice.verify(req.headers.authorization!)

    if (typeof auth === 'object'){
        const update = await UsuarioProvider.updateById(auth.uid,req.body);

        if(update instanceof Error){
            console.log(update);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                default:{
                    error: update.message
                }
            });
        }
        return res.status(StatusCodes.OK).json(update);
    }

    return res.status(StatusCodes.BAD_REQUEST).json(auth)


};
