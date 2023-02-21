import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { validation } from "../../shared/middleware";
import * as yup from 'yup'
import { PerguntaProvider } from "../../database/providers/perguntas";

interface IQueryParams {
    id: number
}

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IQueryParams>(yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })),
  }));


export const deleteById = async(req:Request<IQueryParams>, res:Response) =>{

    
    if (!req.params.id){
      return res.status(StatusCodes.BAD_REQUEST).json({
          default:{
            error: 'O campo "id" precisa ser informado na URL'
          }  
      })
     }

    const result = PerguntaProvider.deleteById(req.params.id)

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors:{
            default: result.message
          }
        });
      }
   
        
    return res.status(StatusCodes.NO_CONTENT).send();
}