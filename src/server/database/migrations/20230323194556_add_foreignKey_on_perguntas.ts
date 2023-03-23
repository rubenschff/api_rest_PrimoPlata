import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.table(ETableNames.perguntas,
        table => {
            table.integer('alternativaCorreta').unsigned().references('id').inTable(ETableNames.alternativas).notNullable().onDelete('SET NULL');
        }).then(()=> {
        console.log(`# Alter table ${ETableNames.perguntas}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.alterTable(ETableNames.perguntas,table =>{
        table.dropColumn('alternativaCorreta')
    }).then(()=>{
        console.log(`# Dropped table ${ETableNames.perguntas}`)
    });
}
