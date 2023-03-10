import {IUsuario} from "../../models";
import  { Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";
import { passwordCrypto } from "../../../shared/services";
import {JWTservice} from "../../../shared/services/JWTservice";
import * as http from "http";


export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<object| Error> => {
    try {
        const hashedPassword = await passwordCrypto.hashPassword(usuario.password!);
        const [result] = await Knex(ETableNames.usuario).insert({...usuario, password: hashedPassword}).returning('id');


        if(typeof result === 'object') {
            const accessToken = JWTservice.sign({uid: result.id})
            return {id:result.id,accessToken: accessToken};
        }

        return Error('Erro ao inserir registro');
    }  catch (e) {
        console.log(e);
        return Error('Erro ao inserir registro');
    }
};