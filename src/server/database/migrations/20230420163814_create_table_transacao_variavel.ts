import { Knex } from "knex";
import {ETableNames, TransacaoVariavelTable} from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.transacao_variavel, table =>{
        table.bigIncrements(TransacaoVariavelTable.id).primary().index();
        table.integer(TransacaoVariavelTable.transacaoId).references(TransacaoVariavelTable.transacaoReferencePK).notNullable().onDelete('CASCADE');
        table.integer(TransacaoVariavelTable.quantidadeCotas).notNullable().index();
        table.double(TransacaoVariavelTable.valorCota).notNullable().index();
        table.double(TransacaoVariavelTable.dividendo).notNullable().index();
        table.timestamps(true,true,true);
    }).then(()=>{
        console.log(`# Created table ${ETableNames.transacao_variavel}`);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.transacao_variavel).then(()=>{
        console.log(`# Dropped table ${ETableNames.transacao_variavel}`);
    })
}

