import {IUsuario} from "../../models";
import  { Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";
import { passwordCrypto } from "../../../shared/services";
import {JWTservice} from "../../../shared/services/JWTservice";


export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<string| Error> => {
    try {
        const hashedPassword = await passwordCrypto.hashPassword(usuario.password!);
        const [result] = await Knex(ETableNames.usuario).insert({...usuario, password: hashedPassword}).returning('id');
        const accessToken = JWTservice.sign({uid: result.id})
        console.log(result);

        if(typeof result === 'object'){
            return accessToken;
        }else if (typeof result === 'number'){
            return accessToken;
        }

        return Error('Erro ao inserir registro');
    }  catch (e) {
        console.log(e);
        return Error('Erro ao inserir registro');
    }
};