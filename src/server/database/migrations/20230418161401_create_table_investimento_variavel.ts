import { Knex } from 'knex';
import {ETableNames, InvestimentoFixoTable, InvestimentoVariavelTable} from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.investimento_variavel,
        table => {
            table.bigIncrements(InvestimentoVariavelTable.id).primary().index();
            table.integer(InvestimentoVariavelTable.investimentoId).references(InvestimentoVariavelTable.investimentoReferencePK)
                .notNullable().onDelete('CASCADE');
            table.double(InvestimentoVariavelTable.preco).index().notNullable();
            table.double(InvestimentoVariavelTable.dividendo).index();
            table.integer(InvestimentoVariavelTable.diaParaAtualizar).index();
            table.date(InvestimentoVariavelTable.manutencao).index().notNullable()
            table.timestamps(true, true,true);
        }).then(()=> {
        console.log(`# Created table ${ETableNames.investimento_variavel}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.investimento_variavel).then(()=>{
        console.log(`# Dropped table ${ETableNames.investimento_variavel}`)
    });
}

