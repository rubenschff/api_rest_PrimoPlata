import { Request, Response } from "express";



export const teste = {};

export const create = ( req: Request, res: Response) =>{
    return res.send('Criado!');
}