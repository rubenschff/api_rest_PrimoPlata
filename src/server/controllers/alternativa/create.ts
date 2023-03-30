import { Request, Response } from "express";
import { IAlternativaDTO } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from 'yup'
import { AlternativaProvider } from "../../database/providers/alternativa";

interface IBodyProps extends Omit<IAlternativaDTO, 'id'>{}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        descricao: yup.string().required(),
        alternativa: yup.number().integer().required(),
        explicacao: yup.string().required(),
        perguntaId: yup.number().integer().required()
    })),
  }));

export const create = async (req:Request<{},{},IBodyProps>,res:Response) =>{
    
    const result = await AlternativaProvider.create(req.body)

    return res.status(StatusCodes.CREATED).json(result)
}