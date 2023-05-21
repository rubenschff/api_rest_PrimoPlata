import {IRespostaDTO} from "../../models";
import {SituacaoPergunta} from "../../enums";


export const situacao = (alternativaCorreta:number, respostas:IRespostaDTO[]) => {

            let alternativas:Array<number> = []

            for (let i in respostas) {
                alternativas.push(respostas[i].idAlternativa)
            }


            if (alternativas.length == 0){
                return SituacaoPergunta.EM_ABERTO
            }else if(alternativas.length == 1 ){
                if(alternativas.indexOf(alternativaCorreta) != -1){
                    return SituacaoPergunta.ACERTOU
                }else {
                    return SituacaoPergunta.EM_ABERTO
                }
            }else if(alternativas.length == 2 ){
                if(alternativas.indexOf(alternativaCorreta) != -1){
                    return SituacaoPergunta.ACERTOU
                }else {
                    return SituacaoPergunta.ERROU
                }
            }else {
                return SituacaoPergunta.BLOQUEADO
            }

}