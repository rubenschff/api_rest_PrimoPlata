import {IUsuario} from "../../models";
import  { Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";
import { passwordCrypto } from "../../../shared/services";


export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number| Error> => {
    try {
        const hashedPassword = await passwordCrypto.hashPassword(usuario.password!);
        const [result] = await Knex(ETableNames.usuario).insert({...usuario, password: hashedPassword}).returning('id');

        if(typeof result === 'object'){
            return result.id;
        }else if (typeof result === 'number'){
            return result;
        }

        return Error('Erro ao inserir registro');
    }  catch (e) {
        console.log(e);
        return Error('Erro ao inserir registro');
    }
};