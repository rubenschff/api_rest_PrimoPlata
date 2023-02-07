import { StatusCodes } from "http-status-codes";
import { IinvestimentoDTO } from "../../database/models";
import { validation } from "../../shared/middleware/validation";
import { Request, RequestHandler, Response, query, request } from "express";
import * as yup from "yup";
import { investimentoProvider } from "../../database/providers/investimento";


interface IBodyProps extends Omit<IinvestimentoDTO, 'id'> {  };
  
  export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        descricao: yup.string().required(),
        risco: yup.number().required(),
        juro: yup.number().required(),
        liquidez: yup.number().required(),
        imagem: yup.string().required(),
    })),
  }));
  
  //cria o usuário
  export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await investimentoProvider.create(req.body);
  
    if (result instanceof Error){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{
          default: result.message
        }
      });
    }
  
    return res.status(StatusCodes.CREATED).json(result);
  };
  