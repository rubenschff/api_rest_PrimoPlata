import { Knex } from 'knex';
import {AccessLogTable, ETableNames} from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.accessLogs,
        table => {
            table.bigIncrements(AccessLogTable.id).primary().index();
            table.string(AccessLogTable.accessToken).index().notNullable();
            table.integer(AccessLogTable.usuarioId).references(AccessLogTable.usuarioReferencePK).notNullable().onDelete('CASCADE')
            table.timestamps(true, true,true);
        }).then(()=> {
        console.log(`# Created table ${ETableNames.accessLogs}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.accessLogs).then(()=>{
        console.log(`# Dropped table ${ETableNames.accessLogs}`)
    });
}

