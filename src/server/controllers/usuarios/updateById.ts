import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import {IUsuario} from "../../database/models";

interface IParamProperties {
  id? : number;
}

interface IBodyPropeties extends Omit<IUsuario, 'id' | 'date_of_birth'>{
    nome?: string,
    nick?: string,
    password?: string,

}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProperties>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<IBodyPropeties>(yup.object().shape({
    nome: yup.string().notRequired().min(3),
    nick: yup.string().notRequired().min(6),
    password: yup.string().notRequired().min(4),
  })),
}));

//cria o usuário
export const updateById = async (req: Request<IParamProperties,{},IBodyPropeties>, res: Response) => {
    console.log(req.params);
    console.log(req.body);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Método ainda não implementado");
};
