import { Knex } from "knex";
import {ETableNames, TransacaoTotalizadorTable, TransacaoVariavelTable} from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.transacao_totalizador, table =>{
        table.bigIncrements(TransacaoTotalizadorTable.id).primary().index();
        table.integer(TransacaoTotalizadorTable.usuarioId).references(TransacaoTotalizadorTable.usuarioReferencePK).notNullable().onDelete('CASCADE');
        table.integer(TransacaoTotalizadorTable.investimentoId).references(TransacaoTotalizadorTable.investimentoReferencePK).notNullable().onDelete('SET NULL');
        table.double(TransacaoTotalizadorTable.valorInicial).notNullable().index();
        table.double(TransacaoTotalizadorTable.valorAcumulado).notNullable().index();
        table.integer(TransacaoTotalizadorTable.quantidadeCotas).index();
        table.timestamps(true,true,true);
    }).then(()=>{
        console.log(`# Created table ${ETableNames.transacao_totalizador}`);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.transacao_totalizador).then(()=>{
        console.log(`# Dropped table ${ETableNames.transacao_totalizador}`);
    })
}

