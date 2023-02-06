import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.usuario,
        table => {
            table.bigIncrements('id').primary().index();
            table.string('name', 150).checkLength('<=', 150).index().notNullable();
            table.string('nickName', 150).index().notNullable().unique();
            table.string('password').index().notNullable();
            table.date('dateOfBirth').index().notNullable();
            table.timestamps(true, true,true);
        }).then(()=> {
        console.log(`# Created table ${ETableNames.usuario}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.usuario).then(()=>{
        console.log(`# Dropped table ${ETableNames.usuario}`)
    });
}

