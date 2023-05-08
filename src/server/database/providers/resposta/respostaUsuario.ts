import {Knex} from "../../knex";
import {ETableNames, RespostaTable} from "../../ETableNames";
import {IRespostaDTO} from "../../models";


export const getRespostas = async (usuario: number, pergunta:number ):Promise<IRespostaDTO[]|Error> => {

    try {
        const result = await Knex(ETableNames.pergunta_resposta)
            .select<IRespostaDTO[]>(
                RespostaTable.idUsuario,
                RespostaTable.idPergunta,
                RespostaTable.idAlternativa,
                RespostaTable.createdAt
            )
            .where(RespostaTable.idUsuario,usuario)
            .where(RespostaTable.idPergunta,pergunta)

        if(result instanceof Error){
          console.log(result.message);
            return Error("Houve um erro ao ler as respostas")
        }

        return result;

    }catch (e) {
        console.log(e);
        return Error("Houve um erro ao ler as respostas")
    }
}