import { Knex } from 'knex';
import {ETableNames, RespostaTable} from '../ETableNames';


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.pergunta_resposta, tableBuilder => {
        tableBuilder.bigIncrements().primary().index();
        tableBuilder.integer(RespostaTable.idUsuario).unsigned().references('id').inTable(ETableNames.usuario).onDelete('SET NULL').defaultTo(null);
        tableBuilder.integer(RespostaTable.idPergunta).unsigned().references('id').inTable(ETableNames.perguntas).onDelete('SET NULL').defaultTo(null);
        tableBuilder.integer(RespostaTable.idAlternativa).unsigned().references('id').inTable(ETableNames.alternativas).onDelete('SET NULL').defaultTo(null);
        tableBuilder.timestamp(RespostaTable.createdAt,{ useTz: true }).index().defaultTo(knex.fn.now());
    }).then(()=> {
        console.log(`# Created table ${ETableNames.pergunta_resposta}`);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.pergunta_resposta).then(()=>{
        console.log(`# Dropped table ${ETableNames.pergunta_resposta}`)
    });
}

