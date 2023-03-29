import { Router } from "express";
import {
  InvestimentoController,
  UsuariosController,
  PerguntasController,
  AlternativaController,
  ComparativoController
} from "../controllers";
import { StatusCodes } from "http-status-codes";
import { autenticateRoutes } from "../shared/middleware";
import {RespostasController} from "../controllers/respostas";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Ola, Dev");
});

// @ts-ignore
router.get("/usuario",autenticateRoutes,UsuariosController.getByIdValidation,UsuariosController.getById);
// @ts-ignore
router.put("/usuario/:id",autenticateRoutes,UsuariosController.updateByIdValidation,UsuariosController.updateById);
// @ts-ignore
router.delete("/usuario/:id",autenticateRoutes,UsuariosController.deleteByIdValidation,UsuariosController.deleteById);

router.post("/cadastrar",UsuariosController.createValidation,UsuariosController.create);

router.post("/entrar", UsuariosController.loginValidation,UsuariosController.login);

//investimentos
router.post("/investimento", InvestimentoController.createValidation, InvestimentoController.create);
router.get("/investimento", InvestimentoController.getAllValidation, InvestimentoController.getAll);


//perguntas
router.post("/perguntas", PerguntasController.createValidation, PerguntasController.create);
router.get("/perguntas", PerguntasController.getAllValidation, PerguntasController.getAll);
// @ts-ignore
router.delete("/perguntas/:id", PerguntasController.deleteByIdValidation, PerguntasController.deleteById);

//alternativa
router.post("/alternativa", AlternativaController.createValidation, AlternativaController.create);

//comparativo
// @ts-ignore
router.put("/comparativo/:id", ComparativoController.updateByIdValidation, ComparativoController.updateByUserId);
router.post("/comparativo", ComparativoController.createValidation, ComparativoController.create);
// @ts-ignore
router.get("/comparativo/:userId", ComparativoController.getByUserIdValidation, ComparativoController.getByUserId);

//-------------------------------------------------Perguntas Respostas-------------------------------------------------
router.post("/perguntas/resposta", RespostasController.createValidation, RespostasController.create);

export { router };
 