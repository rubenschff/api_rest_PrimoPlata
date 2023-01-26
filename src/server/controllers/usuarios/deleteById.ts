import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import {IUsuario} from "../../database/models";
import {UsuarioProvider} from "../../database/providers/usuario";

interface IParamProperties extends Omit<IUsuario, 'name'|'nickName'|'password'|'dateOfBirth'> {
  id : number
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProperties>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

//cria o usuário
export const deleteById = async (req: Request<IParamProperties>, res: Response) => {
  const result = await UsuarioProvider.deleteById(req.params);

  if (result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.OK).json(result);
};
