import {IRespostaDTO} from "../../models";
import {Knex} from "../../knex";
import {ETableNames, RespostaTable} from "../../ETableNames";
import {RespostaProvider} from "./index";
import {PerguntaProvider} from "../perguntas";
import {FinanceiroProvider} from "../financeiro";


export const create = async (resposta: Omit<IRespostaDTO, 'id'>): Promise<number|Error> => {
    try {

        const verify = await Knex(ETableNames.pergunta_resposta)
            .select<IRespostaDTO[]>('*')
            .where(RespostaTable.idAlternativa,resposta.idAlternativa)
            .where(RespostaTable.idPergunta,resposta.idPergunta)
            .where(RespostaTable.idUsuario, resposta.idUsuario)

        if (verify.length > 0){
            return Error('Alternativa ja respondida!')
        }

        const [result] = await Knex(ETableNames.pergunta_resposta).insert(resposta).returning("id");


        //pergunta
        const pergunta = await PerguntaProvider.getAll(1,100,'',resposta.idUsuario, resposta.idPergunta)
        if (pergunta instanceof Error){return pergunta}

        //respostas e ids das alternativas respondidas
        const respostas = await RespostaProvider.getRespostas(resposta.idUsuario, resposta.idPergunta)
        let alternativas:number[] = []
        respostas.map(data => {
            alternativas.push(data.idAlternativa)
        })




        if (alternativas.indexOf(pergunta[0].alternativaCorreta) != -1 ) {

            let financeiro = await FinanceiroProvider.getByUserId(resposta.idUsuario)
            if (financeiro instanceof Error) return financeiro

            if (alternativas.length == 1){
                financeiro.disponivel! += pergunta[0].recompensa
                financeiro.arrecadado! += pergunta[0].recompensa
            }else if (alternativas.length == 2){
                financeiro.disponivel! += pergunta[0].recompensa / 2
                financeiro.arrecadado! += pergunta[0].recompensa / 2
            }

            await FinanceiroProvider.updateByUserId(resposta.idUsuario,
                {...financeiro,
                    disponivel: financeiro.disponivel == undefined ? 0 : Number(financeiro!.disponivel.toFixed(2)),
                    acumulado: financeiro.acumulado == undefined ? 0 : Number(financeiro!.acumulado.toFixed(2)),
                    arrecadado: financeiro.arrecadado == undefined ? 0 : Number(financeiro!.arrecadado.toFixed(2)),
                })

        }





        console.log(result)

        if (typeof result === "object") {
            return result.id;
        } else if (typeof result === "number") {
            return result;
        }

        return Error("Não foi possivel criar a resposta");
    } catch (error) {
        console.log(error)
        return Error("Não foi possivel criar a resposta");
    }
}