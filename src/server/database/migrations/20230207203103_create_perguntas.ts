import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.perguntas,
        table => {
            table.bigIncrements('id').primary().index();
            table.text('descricao').index().notNullable();
            table.double('recompensa').index().notNullable();
            table.text('explicacao').index().notNullable();
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
