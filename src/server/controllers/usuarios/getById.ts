import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { UsuarioProvider } from "../../database/providers/usuario";

interface IParamProperties {
  id : number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProperties>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

//cria o usuário
export const getById = async (req: Request<IParamProperties>, res: Response) => {

  if (!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      default:{
        error: 'O campo "id" precisa ser informado na URL'
      }  
    })
  }

  const getUser = await UsuarioProvider.getById(req.params.id);
  if(getUser instanceof Error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      default:{
        error: getUser.message
      }
    });
  }
    console.log(getUser);
  return res.status(StatusCodes.OK).json(getUser);
};
