import { Knex } from 'knex';
import {ETableNames, FinanceiroTable, InvestimentoTable} from '../ETableNames';


export async function up(knex: Knex) {
    return (

        await knex.schema.renameTable('comparacao', ETableNames.financeiro).then(()=>{
            console.log(`# Rename table comparacao to ${ETableNames.financeiro}`);
        }),

         knex.schema.table(ETableNames.financeiro,
            table => {
                table.renameColumn('moedasRecebidas', FinanceiroTable.arrecadado);
                table.renameColumn('moedasTotais', FinanceiroTable.acumulado);
                table.renameColumn('moedasDisponiveis', FinanceiroTable.disponivel);
            }).then(()=> {
            console.log(`# Rename columns on table ${ETableNames.investimento}`);
        })
    )
}


export async function down(knex: Knex) {
    return (
        await knex.schema.renameTable( ETableNames.financeiro,'comparacao').then(()=>{
            console.log(`# Rename table ${ETableNames.financeiro} to comparacao`);
        }),

            knex.schema.table(ETableNames.financeiro,
                table => {
                    table.renameColumn(FinanceiroTable.arrecadado, 'moedasRecebidas');
                    table.renameColumn(FinanceiroTable.acumulado, 'moedasTotais');
                    table.renameColumn(FinanceiroTable.disponivel, 'moedasDisponiveis');
                }).then(()=> {
                console.log(`# Rename columns on table comparacao`);
            })
    )
}
