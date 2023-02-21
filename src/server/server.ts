import express, { Request } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
//importa as traduções do yup
import './shared/services/TranslationsYup'
import { router } from './routes'

const server = express(); 

server.use(cors<Request>());
server.use(express.json());
server.use(router);


export { server };