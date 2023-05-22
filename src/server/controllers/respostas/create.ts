import { Request, RequestHandler, Response, query, request } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import {CookieDto, IRespostaDTO} from "../../database/models";
import {RespostaProvider} from "../../database/providers/resposta";
import {JWTservice} from "../../shared/services/JWTservice";
import {PerguntaProvider} from "../../database/providers/perguntas";
import {StatusCodes} from "http-status-codes";
import {PerguntasController} from "../perguntas";
import {format_pergunta} from "../../helper/format_pergunta";
import {proxima_pergunta} from "../perguntas/proxima_pergunta";

interface IBodyProps extends Omit<IRespostaDTO, 'id'|'idUsuario'> {}

interface IParamProperties extends CookieDto{

}

export const createValidation = validation((getSchema) => ({
    header: getSchema<IParamProperties>(yup.object().shape({
        authorization: yup.string().required()
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        idPergunta: yup.number().integer().required().moreThan(0),
        idAlternativa: yup.number().integer().required().moreThan(0),
    })),
}));

//cria o usuário
export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const auth = JWTservice.verify(req.headers.authorization!)

    if (typeof auth === 'object'){

        const resposta = await RespostaProvider.create({idUsuario:auth.uid,...req.body})

        if (resposta instanceof Error){
            return res.json({
                error: resposta.message
            })
        }

        const proximapergunta = await PerguntaProvider.proximaPergunta(auth.uid)



        if (proximapergunta instanceof Error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: proximapergunta.message
            })
        }

            const proxima = format_pergunta(proximapergunta, auth.uid)

            console.log(proximapergunta[0])
            return res.status(StatusCodes.OK).json(proxima[0]);


    }

    return res.json({
        error: auth
    })

};
