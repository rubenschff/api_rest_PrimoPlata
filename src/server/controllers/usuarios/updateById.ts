import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import {IUsuario} from "../../database/models";
import { UsuarioProvider } from "../../database/providers/usuario";

interface IParamProperties {
  id : number;
}

interface IBodyPropeties extends Omit<IUsuario, 'id' | 'dateOfBirth'>{ }

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProperties>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<IBodyPropeties>(yup.object().shape({
    name: yup.string().notRequired().min(3).max(150),
    nickName: yup.string().notRequired().min(6),
    password: yup.string().notRequired().min(4),
  })),
}));

//cria o usuário
export const updateById = async (req: Request<IParamProperties,{},IBodyPropeties>, res: Response) => {

    if (!req.params.id){
      return res.status(StatusCodes.BAD_REQUEST).json({
        default:{
          error: 'O campo "id" precisa ser informado na URL'
        }  
      })
    }

    const update = await UsuarioProvider.updateById(req.params.id,req.body);

   if(update instanceof Error){
      console.log(update);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        default:{
          error: update.message
        }
      });
    }

  return res.status(StatusCodes.NO_CONTENT).json("Usuário atualizado");
};
