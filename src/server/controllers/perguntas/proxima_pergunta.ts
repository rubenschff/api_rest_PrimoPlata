import {CookieDto} from "../../database/models";
import {validation} from "../../shared/middleware";
import * as yup from "yup";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {JWTservice} from "../../shared/services/JWTservice";
import {PerguntaProvider} from "../../database/providers/perguntas";
import {proximaPergunta} from "../../database/providers/perguntas/proximaPergunta";


interface IParamProperties extends CookieDto{ }

export const proxima_perguntaValidation = validation((getSchema) => ({
    header: getSchema<IParamProperties>(yup.object().shape({
        authorization: yup.string().required()
    }))
}));


export const proxima_pergunta = async (req: Request<IParamProperties> , res: Response) => {

    if (!req.headers.authorization){
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: 'O token precisa ser informado no header'
            }
        })
    }

    const auth = JWTservice.verify(req.headers.authorization!)

    if(typeof auth === 'object'){
        const proxima_pergunta = await PerguntaProvider.proximaPergunta(auth.uid)

        if (proxima_pergunta instanceof Error){
            return res.status(StatusCodes.BAD_REQUEST).json({error: proxima_pergunta.message})
        }

        return res.status(StatusCodes.OK).json({
            usuarioId: auth.uid,
            respostas: proxima_pergunta[0].respostas,
            pergunta: {
                id: proxima_pergunta[0].id,
                descricao: proxima_pergunta[0].descricao,
                explicacao: proxima_pergunta[0].explicacao,
                alternativas: proxima_pergunta[0].alternativas,
                alternativaCorreta: proxima_pergunta[0].alternativaCorreta,
                recompensa: proxima_pergunta[0].recompensa
            }
        });

    }

    return res.status(StatusCodes.BAD_REQUEST).json(auth)

}