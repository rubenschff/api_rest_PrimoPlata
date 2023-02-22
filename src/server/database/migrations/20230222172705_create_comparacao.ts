import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.comparacao,
        table => {
            table.bigIncrements('id').primary().index();
            table.float('moedasRecebidas',2).index().notNullable().defaultTo(0);
            table.float('moedasTotais',2).index().notNullable().defaultTo(0);
            table.float('moedasDisponiveis',2).index().notNullable().defaultTo(0);
            table.integer('usuarioId').references(ETableNames.usuario+'.id').notNullable().onDelete('CASCADE')
            table.timestamps(true, true,true);
        }).then(()=> {
        console.log(`# Created table ${ETableNames.comparacao}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.comparacao).then(()=>{
        console.log(`# Dropped table ${ETableNames.comparacao}`)
    });
}

