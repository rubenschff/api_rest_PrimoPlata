import { IPerguntasDTO } from "../../database/models";
import * as yup from "yup"
import { validation } from "../../shared/middleware";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


interface IBodyProps extends Omit<IPerguntasDTO, 'id' > { }
  
  export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
      descricao: yup.string().required(),
      alternativaCorreta: yup.number().integer().required(),
      explicacao: yup.string().required(),
      recompensa: yup.number().integer().required(),
      alternativas: yup.array().of(yup.object().shape({
            alternativa: yup.number().integer().required(),
            descricao: yup.string().required(),
            explicacao: yup.string().required(),
        })
      ).compact((v) => !v.checked).required(),

    })),
  }));

export const create = async (req: Request<{},{},IBodyProps>, res: Response) =>{
        const result = req.body;

        res.status(StatusCodes.OK).json(result);
}