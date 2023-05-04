import {TotalizadorInvestimentoCron} from "../../crons/totalizador_investimentos";
import {Request,Response} from "express";
import {StatusCodes} from "http-status-codes";


export const processAll = async (req: Request, res: Response) => {

    const process = await TotalizadorInvestimentoCron.processarInvestimentos();

    if (process instanceof Error){
        return res.status(StatusCodes.BAD_REQUEST).json({
            erro: process.message
        })
    }


    return res.status(StatusCodes.OK).json(process)

}