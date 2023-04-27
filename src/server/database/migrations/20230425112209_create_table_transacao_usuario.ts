import { Knex } from "knex";
import {ETableNames, TransacaoUsuarioTable} from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.transacao_usuario, table => {
        table.integer(TransacaoUsuarioTable.usuarioId)
            .references(TransacaoUsuarioTable.usuarioReferencePK).notNullable().onDelete("CASCADE");
        table.integer(TransacaoUsuarioTable.investimentoId)
            .references(TransacaoUsuarioTable.investimentoReferencePK).notNullable().onDelete("SET NULL");
        table.integer(TransacaoUsuarioTable.transacaoId)
            .references(TransacaoUsuarioTable.transacaoReferencePK).notNullable().onDelete("CASCADE");
        table.timestamps(true,true,true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.transacao_usuario).then(()=>{
        console.log(`# Dropped table ${ETableNames.transacao_usuario}`);
    })
}

