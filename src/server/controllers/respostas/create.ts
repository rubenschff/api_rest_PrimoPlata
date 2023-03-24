import { Request, RequestHandler, Response, query, request } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import {IRespostaDTO} from "../../database/models";
import {RespostaProvider} from "../../database/providers/resposta";

interface IBodyProps extends Omit<IRespostaDTO, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idUsuario: yup.number().integer().required().moreThan(0),
        idPergunta: yup.number().integer().required().moreThan(0),
        idAlternativa: yup.number().integer().required().moreThan(0),
    })),
}));

//cria o usuário
export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const resposta = await RespostaProvider.create(req.body)

    if (resposta instanceof Error){
        return res.json({
            error: resposta.message
        })
    }

    return res.json(`Resposta criada com o id ${resposta}`);

};
