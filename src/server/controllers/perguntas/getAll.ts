import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PerguntaProvider } from '../../database/providers/perguntas';

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
  

  export const getAll = async (req: Request<{},{},{},IQueryProperties>,res: Response) => {

    const result = await PerguntaProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filter || '', Number(req.query.id) || 0)

    return res.status(StatusCodes.OK).json(result);
  }