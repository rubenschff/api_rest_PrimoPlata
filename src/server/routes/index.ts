import { Router } from "express";
import { UsuariosController } from "../controllers";
import {StatusCodes} from "http-status-codes"


const router = Router();

router.get('/', (req, res) => {
  return res.send('Ola, Dev');
});


router.post('/usuario', UsuariosController.create);



export {router};