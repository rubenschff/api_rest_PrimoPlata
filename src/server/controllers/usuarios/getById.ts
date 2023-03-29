import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import {autenticateRoutes, validation} from "../../shared/middleware";
import { UsuarioProvider } from "../../database/providers/usuario";
import {JWTservice} from "../../shared/services/JWTservice";

interface IParamProperties {
  authorization : string;
}

export const getByIdValidation = validation((getSchema) => ({
  header: getSchema<IParamProperties>(yup.object().shape({
    authorization: yup.string().required()
  })),
}));

//cria o usuário
export const getById = async (req: Request<IParamProperties>, res: Response) => {

  if (!req.headers.authorization){
    return res.status(StatusCodes.BAD_REQUEST).json({
      default:{
        error: 'O token precisa ser informado no header'
      }  
    })
  }

  const auth = JWTservice.verify(req.headers.authorization!)

  if (typeof auth === 'object'){
    const getUser = await UsuarioProvider.getById(auth.uid);
    console.log(getUser);
    if(getUser instanceof Error){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        default:{
          error: getUser.message
        }
      });
    }
    return res.status(StatusCodes.OK).json(getUser);
  }

  return res.status(StatusCodes.UNAUTHORIZED).json(auth)

};
