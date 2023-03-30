import { Knex } from 'knex';
import {ETableNames, PerguntasTable} from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.perguntas,
        table => {
            table.bigIncrements(PerguntasTable.id).primary().index();
            table.text(PerguntasTable.descricao).index().notNullable();
            table.double(PerguntasTable.recompensa).index().notNullable();
            table.text(PerguntasTable.explicacao).index().notNullable();
            table.timestamps(true, true,true);
        }).then(()=> {
        console.log(`# Created table ${ETableNames.perguntas}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.perguntas).then(()=>{
        console.log(`# Dropped table ${ETableNames.perguntas}`)
    });
}
