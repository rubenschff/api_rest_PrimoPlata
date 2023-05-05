import { Knex } from "knex";
import {ETableNames, TransacaoTable} from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table(ETableNames.transacao, table =>{
        table.json(TransacaoTable.log).nullable()
    }).then(()=>{
        console.log(`# Alter table ${ETableNames.transacao}`)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table(ETableNames.transacao, table =>{
        table.dropColumn(TransacaoTable.log)
    }).then(() =>{
        console.log(`# Dropped column on table ${ETableNames.transacao}`)
    })
}

