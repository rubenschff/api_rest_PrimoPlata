import {IUsuario} from "../../models";
import  { Knex} from "../../knex";
import {ETableNames, UsuarioTable} from "../../ETableNames";
import { passwordCrypto } from "../../../shared/services";
import {JWTservice} from "../../../shared/services/JWTservice";
import * as http from "http";
import {UsuarioProvider} from "./index";
import {FinanceiroProvider} from "../financeiro";


export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<object| Error> => {
    try {
        const hashedPassword = await passwordCrypto.hashPassword(usuario.password!);
        const user = await Knex(ETableNames.usuario)
            .insert({...usuario, password: hashedPassword})
            .returning<IUsuario[]>([
                UsuarioTable.id,
                UsuarioTable.name,
                UsuarioTable.nickName,
                UsuarioTable.password,
                UsuarioTable.dateOfBirth
            ]).catch(e =>{
                return Error(e)
        })

        if (user instanceof Error){
            return user
        }


        await FinanceiroProvider.create({
            usuarioId: user[0].id,
            disponivel:100
        })



        const accessToken = JWTservice.sign({uid: user[0].id})
        return {...user[0],accessToken: accessToken};


    }  catch (e) {
        console.log(e);
        return Error('Erro ao inserir registro');
    }
};