import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface IParamProperties {
  id? : number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProperties>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

//cria o usuário
export const getById = async (req: Request<IParamProperties>, res: Response) => {
    console.log(req.params);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Método ainda não implementado");
};
