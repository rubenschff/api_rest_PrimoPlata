import { Knex } from 'knex';
import { ETableNames, InvestimentoFixoTable } from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.investimento_fixo,
        table => {
            table.bigIncrements(InvestimentoFixoTable.id).primary().index();
            table.integer(InvestimentoFixoTable.investimentoId).references(InvestimentoFixoTable.investimentoReferencePK)
                .notNullable().onDelete('CASCADE');
            table.double(InvestimentoFixoTable.juro).index().notNullable();
            table.double(InvestimentoFixoTable.aporteInicial).index();
            table.integer(InvestimentoFixoTable.diaParaCreditar).index();
            table.timestamps(true, true,true);
        }).then(()=> {
        console.log(`# Created table ${ETableNames.investimento_fixo}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.investimento_fixo).then(()=>{
        console.log(`# Dropped table ${ETableNames.investimento_fixo}`)
    });
}

