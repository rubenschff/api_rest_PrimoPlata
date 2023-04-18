import { Knex } from "knex";
import {ETableNames, TransacaoTable} from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.transacao, table =>{
        table.bigIncrements(TransacaoTable.id).primary().index();
        table.integer(TransacaoTable.usuarioId).references(TransacaoTable.usuarioReferencePK).notNullable().onDelete('SET NULL');
        table.integer(TransacaoTable.investimentoId).references(TransacaoTable.investimentoReferencePK).notNullable().onDelete('SET NULL');
        table.integer(TransacaoTable.tipo).notNullable().index();
        table.integer(TransacaoTable.situacao).notNullable().index();
        table.timestamps(true,true,true);
    }).then(()=>{
        console.log(`# Created table ${ETableNames.transacao}`);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.transacao).then(()=>{
        console.log(`# Dropped table ${ETableNames.transacao}`);
    })
}

