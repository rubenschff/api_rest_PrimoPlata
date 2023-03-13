import {validation} from "../../shared/middleware";
import * as yup from "yup";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {UsuarioProvider} from "../../database/providers/usuario";
import {ComparativoProvider} from "../../database/providers/comparativo";

interface IParamProperties {
    userId : number;
}
export const getByUserIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProperties>(yup.object().shape({
        userId: yup.number().integer().required().moreThan(0),
    }))
}));
export const getByUserId = async (req: Request<IParamProperties>, res: Response) => {

    if (!req.params.userId){
        return res.status(StatusCodes.BAD_REQUEST).json({
            default:{
                error: 'O campo "userId" precisa ser informado na URL'
            }
        })
    }

    const getComparativo = await ComparativoProvider.getByUserId(req.params.userId);
    console.log(getComparativo);
    if(getComparativo instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            default:{
                error: getComparativo.message
            }
        });
    }
    return res.status(StatusCodes.OK).json(getComparativo);
};