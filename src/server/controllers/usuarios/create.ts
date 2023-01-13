import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface IUsuario {
  nome: string;
  nick: string;
  date_of_birth: Date;
}

interface IFilter {
  filter: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IUsuario>(yup.object().shape({
    nome: yup.string().required().min(3),
    nick: yup.string().required().min(3),
    date_of_birth: yup.date().required(),
  })),
  query: getSchema<IFilter>(yup.object().shape({
    filter: yup.string().required().min(3),
  })),
}));

//cria o usuário
export const create = async (req: Request<{}, {}, IUsuario>, res: Response) => {
  return res.status(StatusCodes.CREATED).json("Criado!");
};
