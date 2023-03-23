import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.alternativas,
        table => {
            table.bigIncrements('id').primary().index();
            table.text('descricao').index().notNullable();
            table.text('explicacao').index().notNullable();
            table.integer('perguntaId').references('perguntas.id').notNullable().onDelete('CASCADE')
            table.timestamps(true, true,true);
        }).then(()=> {
        console.log(`# Created table ${ETableNames.alternativas}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.alternativas).then(()=>{
        console.log(`# Dropped table ${ETableNames.alternativas}`)
    });
}
