import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(ETableNames.alternativas).del();

  // Inserts seed entries
  await knex(ETableNames.alternativas).insert([
    {
      perguntaId: 1,
      alternativa: 1,
      descricao:
        "Comprar um calçado novo, mesmo possuindo varios calçado que você gosta.",
      explicacao:
        "Quanto mais objetos iguais nós temos, nesse caso um calçado, menos valor eles tem para nós. Pois seu valor está na utilidade e não na quantidade.",
    },
    {
      perguntaId: 1,
      alternativa: 2,
      descricao:
        "Comer alguma coisa na lanchonete, ainda que não esteja com fome.",
      explicacao:
        "O valor da comida está na nutrição do nosso corpo ao comer. Mas se não temos fome, o valor dela para nós diminui bastante.",
    },
    {
      perguntaId: 1,
      alternativa: 3,
      descricao: "Sair com seus melhores amigos.",
      explicacao:
        "Usar seu dinheiro para se divertir com seus amigo é uma boa escolha. Muito bem!",
    },
    {
      perguntaId: 2,
      alternativa: 1,
      descricao:
        "Comprar um sapato novo, mesmo possuindo varios sapatos que você gosta.",
      explicacao: "",
    },
    {
      perguntaId: 2,
      alternativa: 2,
      descricao:
        "Comer alguma coisa na lanchonete, ainda que não esteja com fome.",
      explicacao: "",
    },
    {
      perguntaId: 2,
      alternativa: 3,
      descricao: "Sair com seus melhores amigos.",
      explicacao: "",
    },
    {
      perguntaId: 3,
      alternativa: 1,
      descricao:
        "Comprar um sapato novo, mesmo possuindo varios sapatos que você gosta.",
      explicacao: "",
    },
    {
      perguntaId: 3,
      alternativa: 2,
      descricao:
        "Comer alguma coisa na lanchonete, ainda que não esteja com fome.",
      explicacao: "",
    },
    {
      perguntaId: 3,
      alternativa: 3,
      descricao: "Sair com seus melhores amigos.",
      explicacao: "",
    },
  ]);
}
