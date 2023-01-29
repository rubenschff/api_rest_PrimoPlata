import { Request, RequestHandler, Response, query, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { UsuarioProvider } from "../../database/providers/usuario";

interface IQueryProperties {
  id? : number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProperties>(yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    id: yup.number().integer().notRequired().default(0),
    filter: yup.string().notRequired(),
  })),
}));

//cria o usuário
export const getAll = async (req: Request<{}, {}, {},IQueryProperties>, res: Response) => {

    const result = await UsuarioProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filter || '', Number(req.query.id) || 0);

    if(result instanceof Error){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        default:{
          error: result.message
        }
      });
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count','count')

    console.log(result)
    return res.status(StatusCodes.OK).json(result);
};
