import {IRespostaDTO} from "../../models";
import {SituacaoPergunta} from "../../enums";


export const situacao = (alternativaCorreta:number, respostas:IRespostaDTO[]) => {
        try {
            console.log(alternativaCorreta)
            console.log(respostas)

            let alternativas = []
            for (let i in respostas) {
                alternativas.push(respostas[i].idAlternativa)
            }

            if (alternativas.length == 0){
                return SituacaoPergunta.EM_ABERTO
            }else if(alternativas.length == 2){
                if(alternativas.indexOf(alternativaCorreta) == -1){
                    return SituacaoPergunta.ERROU
                }
            }

            console.log(`Alternativas ${alternativas}`)





            return Error("Não foi possivel definir a situação da pergunta")
        }catch (e) {
            console.log(e)
            return Error("Não foi possivel definir a situação da pergunta")
        }
}