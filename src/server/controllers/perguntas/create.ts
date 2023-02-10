import { IPerguntasDTO } from "../../database/models";
import * as yup from "yup"
import { validation } from "../../shared/middleware";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PerguntaProvider } from "../../database/providers/perguntas";


interface IBodyProps extends Omit<IPerguntasDTO, 'id' > { }
  
  export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
      descricao: yup.string().required(),
      alternativaCorreta: yup.number().integer().required(),
      explicacao: yup.string().required(),
      recompensa: yup.number().integer().required(),
    })),
  }));

export const create = async (req: Request<{},{},IBodyProps>, res: Response) =>{
        const result = await PerguntaProvider.create(req.body)
        
        if (result instanceof Error){
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
              default: result.message
            }
          });
        }
      
      
        return res.status(StatusCodes.CREATED).json(`ID da alternativa = ${result}`);
}