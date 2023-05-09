import { Request, RequestHandler, Response, query, request } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import {CookieDto, IRespostaDTO} from "../../database/models";
import {RespostaProvider} from "../../database/providers/resposta";
import {JWTservice} from "../../shared/services/JWTservice";
import {PerguntaProvider} from "../../database/providers/perguntas";
import {StatusCodes} from "http-status-codes";
import {PerguntasController} from "../perguntas";

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

        if (proximapergunta.length == 0){
            return res.status(StatusCodes.BAD_GATEWAY).json({
                error: 'Acabaram as perguntas'
            })
        }


            return res.status(StatusCodes.OK).json({
                usuarioId: auth.uid,
                respostas: proximapergunta[0].respostas,
                pergunta: {
                    id: proximapergunta[0].id,
                    descricao: proximapergunta[0].descricao,
                    explicacao: proximapergunta[0].explicacao,
                    alternativas: proximapergunta[0].alternativas,
                    alternativaCorreta: proximapergunta[0].alternativaCorreta,
                    recompensa: proximapergunta[0].recompensa
                }
            });


    }

    return res.json({
        error: auth
    })

};
