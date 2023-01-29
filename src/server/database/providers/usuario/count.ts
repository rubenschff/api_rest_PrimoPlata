import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"



export const count = async (filter: ''): Promise<Number|Error> => {
        try {
            const [{ count }] = await Knex(ETableNames.usuario)
            .where('nome','like',`%${filter}%`)
            .count<[{count:Number}]>('as count');

            if(Number.isInteger(Number(count))) return Number(count);

            return Error('Erro ao consultar a quantidade total de registros');

        } catch (error) {
                console.log(error);
                return Error('Erro ao consultar a quantidade total de registros');
        }
}