import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PerguntaProvider } from '../../database/providers/perguntas';
import {RespostaProvider} from "../../database/providers/resposta";

interface IQueryProperties {
    userId? : number;
    page?: number;
    limit?: number;
    filter?: string;
  }

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProperties>(yup.object().shape({
      page: yup.number().notRequired().moreThan(0),
      limit: yup.number().notRequired().moreThan(0),
      userId: yup.number().integer().required().moreThan(0),
      filter: yup.string().notRequired(),
    })),
  }));
  

  export const getAll = async (req: Request<{},{},{},IQueryProperties>,res: Response) => {


    const result = await PerguntaProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filter || '', Number(req.query.userId))

    return res.status(StatusCodes.OK).json(result);
  }