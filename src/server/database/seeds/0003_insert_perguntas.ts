import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(ETableNames.perguntas).del();

  // Inserts seed entries
  await knex(ETableNames.perguntas).insert([
    {
      id: 1,
      descricao:
        "<p>Se você tivesse dinheiro sobrando, quais das situações a seguir seriam as melhores opções para gastar esse dinheiro:</p>",
      recompensa: 100,
      explicacao: `<p>O dinheiro é o nosso mais forte aliado. Com ele, podemos sair com os amigos, comprar comida e roupas lindas de astronauta...
        O dinheiro pode comprar experiências incríveis. Mas para isso acontecer, precisamos saber usar ele da melhor forma possível.  </p>
        <p>
          Por primeiro, vamos diferenciar preço e valor das coisas. O preço é o quanto você vai pagar por algo ou o quanto vai ter que se esforçar para ter aquilo.
          Já o valor representa quanto algo é importante para você. Quando comparamos o preço e o valor, podemos decidir se o preço vale a pena ser pago para conseguir aquilo que é importante para nós.
        </p>
        <p>• Se aquilo que vamos comprar é importante para nós, então vale a pena gastar nosso dinheiro.</p>
        <p>• Se aquilo que vamos comprar não é tão importante, talvez não seja tão necessário gastar esse dinheiro.</p>
        <p>• Se aquilo que vamos comprar não é importante, então não devemos comprar.</p>`,
    },
    {
      id: 2,
      descricao:
        "<p>Se você tivesse dinheiro sobrando, quais das situações a seguir seriam as melhores opções para gastar esse dinheiro:</p>",
      recompensa: 100,
      explicacao: `<p>O dinheiro é o nosso mais forte aliado. Com ele, podemos sair com os amigos, comprar comida e roupas lindas de astronauta...
    O dinheiro pode comprar experiências incríveis. Mas para isso acontecer, precisamos saber usar ele da melhor forma possível.  </p>
    <p>
      Por primeiro, vamos diferenciar preço e valor das coisas. O preço é o quanto você vai pagar por algo ou o quanto vai ter que se esforçar para ter aquilo.
      Já o valor representa quanto algo é importante para você. Quando comparamos o preço e o valor, podemos decidir se o preço vale a pena ser pago para conseguir aquilo que é importante para nós.
    </p>
    <p>• Se aquilo que vamos comprar é importante para nós, então vale a pena gastar nosso dinheiro.</p>
    <p>• Se aquilo que vamos comprar não é tão importante, talvez não seja tão necessário gastar esse dinheiro.</p>
    <p>• Se aquilo que vamos comprar não é importante, então não devemos comprar.</p>`,
    },
    {
      id: 3,
      descricao:
        "<p>Se você tivesse dinheiro sobrando, quais das situações a seguir seriam as melhores opções para gastar esse dinheiro:</p>",
      recompensa: 100,
      explicacao: `<p>O dinheiro é o nosso mais forte aliado. Com ele, podemos sair com os amigos, comprar comida e roupas lindas de astronauta...
    O dinheiro pode comprar experiências incríveis. Mas para isso acontecer, precisamos saber usar ele da melhor forma possível.  </p>
    <p>
      Por primeiro, vamos diferenciar preço e valor das coisas. O preço é o quanto você vai pagar por algo ou o quanto vai ter que se esforçar para ter aquilo.
      Já o valor representa quanto algo é importante para você. Quando comparamos o preço e o valor, podemos decidir se o preço vale a pena ser pago para conseguir aquilo que é importante para nós.
    </p>
    <p>• Se aquilo que vamos comprar é importante para nós, então vale a pena gastar nosso dinheiro.</p>
    <p>• Se aquilo que vamos comprar não é tão importante, talvez não seja tão necessário gastar esse dinheiro.</p>
    <p>• Se aquilo que vamos comprar não é importante, então não devemos comprar.</p>`,
    },
  ]);
}
