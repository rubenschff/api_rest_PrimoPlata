import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface IUsuario {
  nome: string;
  nick: string;
  password: string;
  date_of_birth: Date;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IUsuario>(yup.object().shape({
    nome: yup.string().required().min(3),
    nick: yup.string().required().min(6),
    password: yup.string().required().min(6),
    date_of_birth: yup.date().required(),
  })),
}));

//cria o usuário
export const create = async (req: Request<{}, {}, IUsuario>, res: Response) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Método ainda não implementado");
};
