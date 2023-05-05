import { Knex } from "knex";
import {ETableNames, FinanceiroTable, TransacaoTotalizadorTable} from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable(ETableNames.financeiro, table => {
        table.double(FinanceiroTable.disponivel, 2,2).notNullable().defaultTo(0).alter();
        table.double(FinanceiroTable.acumulado, 2,2).notNullable().defaultTo(0).alter();
        table.double(FinanceiroTable.arrecadado, 2,2).notNullable().defaultTo(0).alter();
    }).then(()=>{
        console.log(`# Alter table ${ETableNames.financeiro}`)
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.alterTable(ETableNames.financeiro, table => {
        table.double(FinanceiroTable.disponivel).notNullable().defaultTo(0).alter();
        table.double(FinanceiroTable.acumulado).notNullable().defaultTo(0).alter();
        table.double(FinanceiroTable.arrecadado).notNullable().defaultTo(0).alter();
    }).then(()=>{
        console.log(`# Alter table ${ETableNames.financeiro}`)
    })
}

