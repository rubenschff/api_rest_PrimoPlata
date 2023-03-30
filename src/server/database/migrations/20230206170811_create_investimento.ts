import { Knex } from 'knex';
import {ETableNames, InvestimentoTable} from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.investimento,
        table => {
            table.bigIncrements(InvestimentoTable.id).primary().index();
            table.text(InvestimentoTable.descricao).index().notNullable();
            table.double(InvestimentoTable.risco).index().notNullable();
            table.double(InvestimentoTable.juro).index().notNullable();
            table.double(InvestimentoTable.liquidez).index().notNullable();
            table.string(InvestimentoTable.imagem).index().notNullable();
            table.timestamps(true, true,true);
        }).then(()=> {
        console.log(`# Created table ${ETableNames.investimento}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.investimento).then(()=>{
        console.log(`# Dropped table ${ETableNames.investimento}`)
    });
}

