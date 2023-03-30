import { Knex } from 'knex';
import {ComparacaoTable, ETableNames} from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.comparacao,
        table => {
            table.bigIncrements(ComparacaoTable.id).primary().index();
            table.float(ComparacaoTable.moedasRecebidas,2).index().notNullable().defaultTo(0);
            table.float(ComparacaoTable.moedasTotais,2).index().notNullable().defaultTo(0);
            table.float(ComparacaoTable.moedasDisponiveis,2).index().notNullable().defaultTo(0);
            table.integer(ComparacaoTable.usuarioId)
                .references(ComparacaoTable.usuarioReferencePK)
                .notNullable().unique().onDelete('CASCADE');
            table.timestamps(true, true,true);
        }).then(()=> {
        console.log(`# Created table ${ETableNames.comparacao}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.comparacao).then(()=>{
        console.log(`# Dropped table ${ETableNames.comparacao}`)
    });
}

