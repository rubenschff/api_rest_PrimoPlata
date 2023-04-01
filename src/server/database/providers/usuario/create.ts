import {IUsuario} from "../../models";
import  { Knex} from "../../knex";
import {ETableNames, UsuarioTable} from "../../ETableNames";
import { passwordCrypto } from "../../../shared/services";
import {JWTservice} from "../../../shared/services/JWTservice";
import * as http from "http";
import {UsuarioProvider} from "./index";


export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<object| Error> => {
    try {
        const hashedPassword = await passwordCrypto.hashPassword(usuario.password!);
        const [result] = await Knex(ETableNames.usuario).insert({...usuario, password: hashedPassword}).returning(UsuarioTable.id);


        if(typeof result === 'object') {
            const user = await UsuarioProvider.getById(result.id)
            if (user){
                const accessToken = JWTservice.sign({uid: result.id})
                return {...user,accessToken: accessToken};
            }
        }

        return Error('Erro ao inserir registro');
    }  catch (e) {
        console.log(e);
        return Error('Erro ao inserir registro');
    }
};