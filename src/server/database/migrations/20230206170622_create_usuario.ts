import { Knex } from 'knex';
import {ETableNames, UsuarioTable} from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.usuario,
        table => {
            table.bigIncrements(UsuarioTable.id).primary().index();
            table.string(UsuarioTable.name, 150).checkLength('<=', 150).index().notNullable();
            table.string(UsuarioTable.nickName, 150).index().notNullable().unique();
            table.string(UsuarioTable.password).index().notNullable();
            table.date(UsuarioTable.dateOfBirth).index().notNullable();
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

