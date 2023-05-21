import  { Knex} from "../../knex";
import {ETableNames, PerguntasTable} from "../../ETableNames";
import {IAlternativaDTO, IPerguntasDTO, IRespostaDTO} from "../../models";
import {RespostaProvider} from "../resposta";
import {AlternativaProvider} from "../alternativa";
import {PerguntaProvider} from "./index";

interface Perguntas_Respostas extends IPerguntasDTO {
    respostas: IRespostaDTO[],
    situacao: number,
    alternativas: IAlternativaDTO[]
}

export const getAll = async (page: number, limit: number, filter: string, userId: number , pergunta:number): Promise<Perguntas_Respostas[]|Error> =>{

    try {
        let perguntas :Perguntas_Respostas[] = []

        if (pergunta != 0){
            perguntas = await Knex(ETableNames.perguntas)
                .select(PerguntasTable.id,
                    PerguntasTable.descricao,
                    PerguntasTable.alternativaCorreta,
                    PerguntasTable.recompensa,
                    PerguntasTable.explicacao).where(PerguntasTable.id, pergunta)
        }else {
            perguntas = await Knex(ETableNames.perguntas)
                .select(PerguntasTable.id,
                    PerguntasTable.descricao,
                    PerguntasTable.alternativaCorreta,
                    PerguntasTable.recompensa,
                    PerguntasTable.explicacao)
                .orWhere(PerguntasTable.descricao, 'like', `%${filter}%`)
                .offset((page -1) * limit,)
                .limit(limit);
        }


       return await adicionais(perguntas,userId)


    } catch (error) {
        return Error("Não foi possivel recuperar os registros");
    }
}


export const adicionais = async (perguntas:Perguntas_Respostas[], userId: number):Promise<Perguntas_Respostas[]> =>{

    for (let i in perguntas) {
        perguntas[i].respostas = await RespostaProvider
            .getRespostas(userId,perguntas[i][PerguntasTable.id])

        perguntas[i].situacao = await PerguntaProvider
            .situacao(perguntas[i].alternativaCorreta, perguntas[i].respostas)

        perguntas[i].alternativas = await AlternativaProvider
            .getAlternativas(perguntas[i][PerguntasTable.id])

    }

    return perguntas
}