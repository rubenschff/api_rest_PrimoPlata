import { Knex } from "knex";
import {ETableNames, FinanceiroTable} from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.table(ETableNames.financeiro, table => {
        table.double(FinanceiroTable.compras, 2,2).notNullable().defaultTo(0).index();
        table.double(FinanceiroTable.vendas, 2,2).notNullable().defaultTo(0).index();
    }).then(()=>{
        console.log(`# Alter table ${ETableNames.financeiro}`)
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.table(ETableNames.financeiro, table =>{
        table.dropColumn(FinanceiroTable.compras);
        table.dropColumn(FinanceiroTable.vendas);
    }).then(() => {
        console.log(`# Delete columns from ${ETableNames.financeiro}`);
    })
}

