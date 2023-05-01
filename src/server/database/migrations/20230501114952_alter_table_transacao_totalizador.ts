import { Knex } from "knex";
import {ETableNames, TransacaoTotalizadorTable} from "../ETableNames";


export async function up(knex: Knex): Promise<void> {

    return await knex.schema.alterTable(ETableNames.transacao_totalizador, table => {
        table.double(TransacaoTotalizadorTable.valorInicial).nullable().index().alter();
        table.double(TransacaoTotalizadorTable.valorAcumulado).nullable().index().alter();
    }).then(()=>{
        console.log(`Alter table ${ETableNames.transacao_totalizador}`)
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.alterTable(ETableNames.transacao_totalizador, table => {
        table.double(TransacaoTotalizadorTable.valorInicial).notNullable().index().alter();
        table.double(TransacaoTotalizadorTable.valorAcumulado).notNullable().index().alter();
    }).then(()=>{
        console.log(`Alter table ${ETableNames.transacao_totalizador}`)
    })
}

