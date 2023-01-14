import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface IQueryProperties {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProperties>(yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
  })),
}));

//cria o usuário
export const getAll = async (req: Request<{}, {}, {},IQueryProperties>, res: Response) => {
    console.log(req.query);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Método ainda não implementado");
};
