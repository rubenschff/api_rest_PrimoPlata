import {knex} from "knex" 
import { develop, teste, production  } from "./enviroments"


const getEnviroment = () =>{
    switch (process.env.NODE_ENV) {
        case 'production': return production;
        case 'teste': return teste;
            
        default: return develop;
    }
}


export const Knex = knex(getEnviroment());