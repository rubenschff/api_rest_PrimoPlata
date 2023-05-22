import {IAlternativaDTO, IPerguntasDTO, IRespostaDTO} from "../database/models";


interface Perguntas_Respostas extends IPerguntasDTO {
    respostas: IRespostaDTO[],
    situacao: number,
    alternativas: IAlternativaDTO[]
}

interface PerguntaDTO {
    usuarioId: number;
    respostas: IRespostaDTO[];
    pergunta: {
        id: number;
        descricao: string;
        explicacao: string;
        alternativas: IAlternativaDTO[];
        alternativaCorreta: number;
        recompensa: number;
        situacao: number;
    }
}
export function format_pergunta(data: Perguntas_Respostas[], user: number):PerguntaDTO[] {

    let format: PerguntaDTO[] = []

    data.map(data =>{
        format.push({
            usuarioId : parseInt(user.toString()),
            respostas : data.respostas,
            pergunta : {
                id : parseInt(data.id.toString()),
                descricao : data.descricao,
                explicacao : data.explicacao,
                alternativas : data.alternativas,
                alternativaCorreta : data.alternativaCorreta,
                recompensa : data.recompensa,
                situacao : data.situacao,
            }
        })
    })

    return format

}