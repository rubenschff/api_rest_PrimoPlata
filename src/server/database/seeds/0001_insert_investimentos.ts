import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(ETableNames.investimento).del();

  // Inserts seed entries
  await knex(ETableNames.investimento).insert([
    {
      descricao: "Tesouro Direto",
      risco: 0.5,
      juro: 6,
      liquidez: 1,
      imagem: "./assets/tesouro_direto.png",
    },
    {
      descricao: "Poupança",
      risco: 10,
      juro: 2.5,
      liquidez: 0,
      imagem: "./assets/poupança.png",
    },
    {
      descricao: "CDB",
      risco: 0.5,
      juro: 8.4,
      liquidez: 14,
      imagem: "./assets/CDB.png",
    },
  ]);
}
