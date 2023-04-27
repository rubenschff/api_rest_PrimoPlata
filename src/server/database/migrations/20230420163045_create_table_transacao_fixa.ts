import { Knex } from "knex";
import {ETableNames, TransacaoFixaTable, TransacaoTable} from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.transacao_fixa, table =>{
        table.bigIncrements(TransacaoFixaTable.id).primary().index();
        table.integer(TransacaoFixaTable.transacaoId).references(TransacaoFixaTable.transacaoReferencePK).notNullable().onDelete('CASCADE');
        table.double(TransacaoFixaTable.valor).notNullable().index()
        table.timestamps(true,true,true);
    }).then(()=>{
        console.log(`# Created table ${ETableNames.transacao_fixa}`);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.transacao_fixa).then(()=>{
        console.log(`# Dropped table ${ETableNames.transacao_fixa}`);
    })
}

