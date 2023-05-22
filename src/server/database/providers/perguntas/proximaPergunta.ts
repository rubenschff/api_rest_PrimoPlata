import {IAlternativaDTO, IPerguntasDTO, IRespostaDTO} from "../../models";
import {Knex} from "../../knex";
import {ETableNames} from "../../ETableNames";
import {PerguntaProvider} from "./index";
import {SituacaoPergunta} from "../../enums";

interface Perguntas_Respostas extends IPerguntasDTO {
    respostas: IRespostaDTO[],
    situacao: number,
    alternativas: IAlternativaDTO[]
}
export const proximaPergunta = async (usuario:number):Promise<Error|Perguntas_Respostas[]> => {
  try {

      const resposta = await Knex(ETableNames.pergunta_resposta)
          .select<IRespostaDTO[]>('*')
          .where('idUsuario',usuario)
          .orderBy('createdAt',"desc").limit(1)
          .catch(e=>{
              return Error(e.message)
          })

      if (resposta instanceof Error){
          return resposta
      }

      const perguntasRespostas_situacao:Error|Perguntas_Respostas[] = await PerguntaProvider
          .getAll(1,100,'',usuario,0)

      if (perguntasRespostas_situacao instanceof Error){
          return perguntasRespostas_situacao;
      }

      const disponivel = await PerguntasDisponiveis(perguntasRespostas_situacao);

      if (disponivel.length > 0){
          return [disponivel[0]]
      }else {
          return [perguntasRespostas_situacao[perguntasRespostas_situacao.length-1]]
      }



  }catch (e:any) {
      console.error(e)
      return Error(e)
  }
}

const PerguntasDisponiveis = async (perguntas: Perguntas_Respostas[]):Promise<Perguntas_Respostas[]> =>{

    let emAberto: Perguntas_Respostas[] = [];

    perguntas.map(perguntas => {
        if (perguntas.situacao != SituacaoPergunta.BLOQUEADO && perguntas.situacao != SituacaoPergunta.ACERTOU){
            emAberto.push(perguntas)
        }
    })

    return emAberto
}