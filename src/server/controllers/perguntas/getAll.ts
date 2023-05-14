import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PerguntaProvider } from '../../database/providers/perguntas';
import {RespostaProvider} from "../../database/providers/resposta";
import {CookieDto} from "../../database/models";
import {JWTservice} from "../../shared/services/JWTservice";

interface IQueryProperties {
    pergunta?: number
    page?: number;
    limit?: number;
    filter?: string;
  }

  interface IParamProperties extends CookieDto{ }

export const getAllValidation = validation((getSchema) => ({
    header: getSchema<IParamProperties>(yup.object().shape({
        authorization: yup.string().required()
    })),
    query: getSchema<IQueryProperties>(yup.object().shape({
      page: yup.number().notRequired().moreThan(0).default(1),
      limit: yup.number().notRequired().moreThan(0).default(10),
      filter: yup.string().notRequired().default(''),
        pergunta: yup.number().notRequired().default(0)
    })),
  }));
  

  export const getAll = async (req: Request<{},{},{},IQueryProperties>,res: Response) => {

      if (!req.headers.authorization){
          return res.status(StatusCodes.BAD_REQUEST).json({
              default:{
                  error: 'O token precisa ser informado no header'
              }
          })
      }

      const auth = JWTservice.verify(req.headers.authorization!)

      if (typeof auth === 'object'){
          const result = await PerguntaProvider
              .getAll(req.query.page || 1, req.query.limit || 100, req.query.filter || '', auth.uid, req.query.pergunta || 0)

          return res.status(StatusCodes.OK).json(result);
      }


  }