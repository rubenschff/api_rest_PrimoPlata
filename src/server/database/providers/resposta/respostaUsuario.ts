import {Knex} from "../../knex";
import {ETableNames, PerguntaRespostaTable} from "../../ETableNames";


export const getRespostas = async (usuario: number, pergunta:number ) => {

    try {
        const result = await Knex(ETableNames.pergunta_resposta)
            .select(
                "idAlternativa",
                "createdAt")
            .where("idUsuario",'=',usuario).where('idPergunta','=',pergunta)

        if(result instanceof Error){
          console.log(result.message);
          return Error(result.message)
        }

        return result;



    }catch (e) {
        console.log(e);
    }
}