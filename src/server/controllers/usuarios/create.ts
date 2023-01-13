import { Request, Response, request } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';


interface IUsuario{
    nome: string;
    sobrenome: string;
}


//validação do body com yup
const bodyValidadtion: yup.SchemaOf<IUsuario> = yup.object().shape({
    nome: yup.string().required().min(3),
    sobrenome: yup.string().required().min(3),
});


export const create = async ( req: Request<{},{}, IUsuario>, res: Response) =>{

    let validatedData: IUsuario | undefined = undefined;

    try {
         validatedData =  await bodyValidadtion.validate(req.body, {abortEarly: false}) ;
    } catch (error) {
        //tratando o erro como um yup object
        const yupError = error as yup.ValidationError;
        const errors: Record<string,string> = {}; //definindo uma lista de erros vazia para armazenas os logs antes de retornar

        //lendo a lista de erros dos yup
        yupError.inner.forEach(error => {
            if (!error.path) return; //se for undefined aborta
            
            errors [error.path] = error.message;
        })

        return res.status(StatusCodes.BAD_REQUEST).json({errors});
    }
    //só retorna os dados / cadastra no banco se passar as validações acima
    return res.status(StatusCodes.CREATED).json('Criado!');
}