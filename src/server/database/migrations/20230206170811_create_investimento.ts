import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.investimento,
        table => {
            table.bigIncrements('id').primary().index();
            table.text('descricao').index().notNullable();
            table.double('risco').index().notNullable();
            table.double('juro').index().notNullable();
            table.double('liquidez').index().notNullable();
            table.string('imagem').index().notNullable();
            table.timestamps(true, true,true);
        }).then(()=> {
        console.log(`# Created table ${ETableNames.investimento}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.investimento).then(()=>{
        console.log(`# Dropped table ${ETableNames.investimento}`)
    });
}

