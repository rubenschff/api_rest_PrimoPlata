import { Knex } from 'knex';
import {AlternativasTable, ETableNames} from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.alternativas,
        table => {
            table.bigIncrements(AlternativasTable.id).primary().index();
            table.text(AlternativasTable.descricao).index().notNullable();
            table.text(AlternativasTable.explicacao).index().notNullable();
            table.integer(AlternativasTable.perguntaId)
                .references(AlternativasTable.perguntaReferencePK)
                .notNullable().onDelete('CASCADE')
            table.timestamps(true, true,true);
        }).then(()=> {
        console.log(`# Created table ${ETableNames.alternativas}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.alternativas).then(()=>{
        console.log(`# Dropped table ${ETableNames.alternativas}`)
    });
}
