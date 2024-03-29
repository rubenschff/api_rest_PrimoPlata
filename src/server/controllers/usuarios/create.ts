import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import {IUsuario} from "../../database/models";
import {UsuarioProvider} from "../../database/providers/usuario";

interface IBodyProps extends Omit<IUsuario, 'id'> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(4).max(150),
    nickName: yup.string().required().min(6),
    password: yup.string().required().min(6),
    dateOfBirth: yup.date().required(),
  })),
}));

//cria o usuário
export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const verifyUSerExists = await UsuarioProvider.getByNickName(req.body.nickName!);

  if (verifyUSerExists instanceof Error){

    const result = await UsuarioProvider.create(req.body);

    if (result instanceof Error){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{
          default: result.message
        }
      });
    }

    return res.status(StatusCodes.CREATED).json(result);
  }

  return res.status(StatusCodes.UNAUTHORIZED).json({
    errors:{
      default: 'Usuário ja cadastrado!'
    }
  });
};
