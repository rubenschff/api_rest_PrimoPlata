import {IAccessLogs} from "../../models";
import {Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";


export const accessLog = async (usuario: number, accessToken: string): Promise<number|Error> =>{
    try{
        const [result] = await Knex(ETableNames.accessLogs).insert({'usuarioId': usuario, 'accessToken': accessToken}).returning('id');
        console.log(result)

        if(typeof result === 'object'){
            return result.id;
        }else if (typeof result === 'number'){
            return result;
        }

        return Error('Erro ao inserir registro!')
    }catch (e) {
        return Error('Erro ao inserir registro!')
    }
};