import {IUsuario} from "../../models";
import  { Knex} from "../../knex";
import {ETableNames, UsuarioTable} from "../../ETableNames";
import { passwordCrypto } from "../../../shared/services";
import {JWTservice} from "../../../shared/services/JWTservice";
import {map} from 'rxjs/operators'


export const create = async (usuario: Omit<IUsuario, 'id'|'accessToken'>): Promise<IUsuario| Error> => {
    try {
        const hashedPassword = await passwordCrypto.hashPassword(usuario.password!);
        const result = await Knex(ETableNames.usuario)
            .insert({...usuario, password: hashedPassword})
            .returning<IUsuario>([
                UsuarioTable.id,
                UsuarioTable.name,
                UsuarioTable.nickName,
                UsuarioTable.password
            ]);

        console.log(result)
        if(typeof result === 'object') {
            result['accessToken'] = await JWTservice.sign({uid: result.id})
            return result
        }

        return Error('Erro ao inserir registro');
    }  catch (e) {
        console.log(e);
        return Error('Erro ao inserir registro');
    }
};