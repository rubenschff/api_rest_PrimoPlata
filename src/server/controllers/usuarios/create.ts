import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import {IUsuario} from "../../database/models";

interface IBodyProps extends Omit<IUsuario, 'id'> {
  nome: string;
  nick: string;
  password: string;
  date_of_birth: Date;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    nick: yup.string().required().min(6),
    password: yup.string().required().min(6),
    date_of_birth: yup.date().required(),
  })),
}));

//cria o usuário
export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  return res.status(StatusCodes.CREATED).json("Método ainda não implementado");
};
