import { server } from './server/server';
import * as dotenv from 'dotenv';
import cron from 'node-cron'
import {TotalizadoresCron} from "./server/crons/totalizador_investimentos";

dotenv.config();

//Roda todos os dias as 5am
cron.schedule("0 5 * * *", async () => {

    console.log("------------------------------------Cron Processar Investimentos------------------------------------")
     await TotalizadoresCron.processarTotalizadores

});

server.listen(process.env.PORT || 3333, () => {
    console.log(`App rodando na porta ${process.env.PORT || 3333}`);
})