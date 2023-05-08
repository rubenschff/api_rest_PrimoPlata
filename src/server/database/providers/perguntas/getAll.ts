import  { Knex} from "../../knex";
import {ETableNames, PerguntasTable} from "../../ETableNames";
import {IAlternativaDTO, IPerguntasDTO, IRespostaDTO} from "../../models";
import {RespostaProvider} from "../resposta";
import {AlternativaProvider} from "../alternativa";
import {PerguntaProvider} from "./index";

interface Perguntas_Respostas extends IPerguntasDTO {
    respostas: IRespostaDTO,
    situacao: number,
    alternativas: IAlternativaDTO[]
}
enum addData {
    respostas = 'respostas',
    situacao = 'situacao',
    alternativas = 'alternativas'
}
export const getAll = async (page: number, limit: number, filter: string, userId: number ): Promise<Perguntas_Respostas[]|Error> =>{

    try {

        let result = await Knex(ETableNames.perguntas)
        .select(PerguntasTable.id,
            PerguntasTable.descricao,
            PerguntasTable.alternativaCorreta,
            PerguntasTable.recompensa,
            PerguntasTable.explicacao)
        .orWhere(PerguntasTable.descricao, 'like', `%${filter}%`)
        .offset((page -1) * limit,)
        .limit(limit);


        for (let i in result) {
            result[i][addData.respostas] = await RespostaProvider
                .getRespostas(userId,result[i][PerguntasTable.id])

            result[i][addData.situacao] = await PerguntaProvider
                .situacao(result[i].alternativaCorreta, result[i].respostas)

            result[i][addData.alternativas] = await AlternativaProvider
                .getAlternativas(result[i][PerguntasTable.id])

        }
        
        return result;

    } catch (error) {
        return Error("Não foi possivel recuperar os registros");
    }
}