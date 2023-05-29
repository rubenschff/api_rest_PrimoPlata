import {InvestimentoProvider} from "../../database/providers/investimento";
import {TotalizadorProvider} from "../../database/providers/totalizador";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {ITotalizadorDto} from "../../database/models/totalizador.dto";

export async function processarTotalizadores (req: Request, res: Response) {

    const investimentos = await InvestimentoProvider
        .getAll(1,100,'',0)

    if (investimentos instanceof Error){
        return investimentos
    }

    console.log(investimentos)



        investimentos.map(async (investimento) => {

            let totalizadores = await TotalizadorProvider.getAll(investimento.id)

            for (let i in totalizadores) {
                console.log(`Totalizador ${totalizadores[i].id} inicial ${totalizadores[i].valorAcumulado}`)
                totalizadores[i].valorAcumulado *= 1 + (investimento.juro / 100);
                console.log(`Totalizador ${totalizadores[i].id} final   ${totalizadores[i].valorAcumulado}`)

                await TotalizadorProvider.updateById({...totalizadores[i],
                    valorAcumulado:  Number(totalizadores[i].valorAcumulado.toFixed(2))
                })
            }

        })


    return res.status(StatusCodes.OK).json()

}

