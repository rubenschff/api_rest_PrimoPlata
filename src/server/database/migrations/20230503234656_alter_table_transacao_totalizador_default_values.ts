import { Knex } from "knex";
import {ETableNames, TransacaoTotalizadorTable} from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable(ETableNames.transacao_totalizador, table => {
        table.double(TransacaoTotalizadorTable.valorInicial).notNullable().defaultTo(0).alter();
        table.double(TransacaoTotalizadorTable.valorAcumulado).notNullable().defaultTo(0).alter();
        table.double(TransacaoTotalizadorTable.quantidadeCotas).notNullable().defaultTo(0).alter()
    }).then(()=>{
        console.log(`Alter table ${ETableNames.transacao_totalizador}`)
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.alterTable(ETableNames.transacao_totalizador, table => {
        table.double(TransacaoTotalizadorTable.valorInicial).notNullable().alter();
        table.double(TransacaoTotalizadorTable.valorAcumulado).notNullable().alter();
        table.integer(TransacaoTotalizadorTable.quantidadeCotas);
    }).then(()=>{
        console.log(`Alter table ${ETableNames.transacao_totalizador}`)
    })
}

