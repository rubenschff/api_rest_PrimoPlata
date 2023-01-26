import {IUsuario} from "../../models";
import {Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";



export const deleteById = async (deleteUsuario: Omit<IUsuario, 'name'|'nickName'|'password'|'dateOfBirth'>): Promise<any| Error> =>{
    try {
        
        const result = await Knex(ETableNames.usuario).where(deleteUsuario).delete();
        console.log([result]);

        if (typeof result === 'object'){
            return result;
        }else if (typeof result === 'number'){
            return result;
        }

    }catch (e) {
        console.log(e);
        return Error('Erro ao deletar registro');
    }

}