import { Knex } from 'knex';
import {ETableNames, InvestimentoTable} from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.table(ETableNames.investimento,
        table => {
            table.dropColumn(InvestimentoTable.juro);
            table.text(InvestimentoTable.explicacao).index();
        }).then(()=> {
        console.log(`# Alter table ${ETableNames.investimento}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.table(ETableNames.investimento, table =>{
        table.double(InvestimentoTable.juro).index();
        table.dropColumn(InvestimentoTable.explicacao)
    }).then(()=>{
        console.log(`# Rollback changes on table ${ETableNames.investimento}`)
    });
}
