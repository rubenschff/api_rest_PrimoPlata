import {CookieDto} from "../../database/models";
import {validation} from "../../shared/middleware";
import * as yup from "yup";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {JWTservice} from "../../shared/services/JWTservice";
import {PerguntaProvider} from "../../database/providers/perguntas";


interface Header extends CookieDto{ }

export const proximaPerguntaValidation = validation((getSchema) => ({
    header: getSchema<Header>(yup.object().shape({
        authorization: yup.string().required()
    }))
}));


export const ProximaPergunta = async (req: Request<Header>, res:Response) => {

    if (!req.headers.authorization){
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: 'O token precisa ser informado no header'
            }
        })
    }

    const auth = JWTservice.verify(req.headers.authorization!)

    if(typeof auth === 'object'){
        const proximapergunta = await PerguntaProvider.proximaPergunta(auth.uid)

        if (proximapergunta instanceof Error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                    error: proximapergunta.message
                })
        }

        return res.status(StatusCodes.OK).json(proximapergunta)
    }


    return res.status(StatusCodes.BAD_REQUEST).json(auth)

}