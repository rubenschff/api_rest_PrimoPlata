import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PerguntaProvider } from '../../database/providers/perguntas';
import {RespostaProvider} from "../../database/providers/resposta";
import {CookieDto, IAlternativaDTO, IRespostaDTO} from "../../database/models";
import {JWTservice} from "../../shared/services/JWTservice";
import {SituacaoPergunta} from "../../database/enums";
import {format_pergunta} from "../../helper/format_pergunta";

interface IQueryProperties {
    pergunta?: number
    page?: number;
    limit?: number;
    filter?: string;
  }

  interface PerguntaDTO {
      usuarioId: number;
      respostas: IRespostaDTO[];
      pergunta: {
          id: number;
          descricao: string;
          explicacao: string;
          alternativas: IAlternativaDTO[];
          alternativaCorreta: number;
          recompensa: number;
          situacao: number;
      }
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


          if (result instanceof Error){
              return res.status(StatusCodes.BAD_REQUEST).json(result.message)
          }


         if (result.length>0){

             for (let i in result){
                 console.log(`for i = ${i}`)
                  if (result[i].situacao == SituacaoPergunta.EM_ABERTO){

                      let aux = parseInt(i) + 1;
                      console.log(`for aux = ${aux}`)
                      for (aux; aux<result.length;aux++){
                          result[aux].situacao = SituacaoPergunta.BLOQUEADO
                      }

                  }

              }
          }

          const perguntas = format_pergunta(result, auth.uid)

          return res.status(StatusCodes.OK).json(perguntas);
      }


  }