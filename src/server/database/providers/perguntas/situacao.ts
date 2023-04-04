import {IRespostaDTO} from "../../models";
import {SituacaoPergunta} from "../../enums";


export const situacao = (alternativaCorreta:number, respostas:IRespostaDTO[]) => {
        try {

            let alternativas = []
            for (let i in respostas) {
                alternativas.push(respostas[i].idAlternativa)
            }


            if (alternativas.length == 0){
                return SituacaoPergunta.EM_ABERTO
            }else if(alternativas.length == 1 || alternativas.length == 2){
                if(alternativas.indexOf(alternativaCorreta) != -1){
                    return SituacaoPergunta.ACERTOU
                }else {
                    return SituacaoPergunta.ERROU
                }
            }else {
                return SituacaoPergunta.BLOQUEADO
            }

        }catch (e) {
            console.log(e)
            return Error("Não foi possivel definir a situação da pergunta")
        }
}