import { Router } from "express";
import {
  InvestimentoController,
  UsuariosController,
  PerguntasController,
  AlternativaController,
  ComparativoController
} from "../controllers";
import { autenticateRoutes } from "../shared/middleware";
import {RespostasController} from "../controllers/respostas";
import {RoutesEnum} from "./routes.enum";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Ola, Dev");
});


//-------------------------------------------------Login e Cadastro-------------------------------------------------
router.post(RoutesEnum.cadastrar,UsuariosController.createValidation,UsuariosController.create);
router.post(RoutesEnum.entrar, UsuariosController.loginValidation,UsuariosController.login);


//-------------------------------------------------Rota de usuário-------------------------------------------------
// @ts-ignore
router.get(RoutesEnum.usuario,autenticateRoutes,UsuariosController.getByIdValidation,UsuariosController.getById);
// @ts-ignore
router.put(RoutesEnum.usuario,autenticateRoutes,UsuariosController.updateByIdValidation,UsuariosController.updateById);
// @ts-ignore
router.delete(RoutesEnum.usuario+"/:id",autenticateRoutes,UsuariosController.deleteByIdValidation,UsuariosController.deleteById); //todo ajustar pra fazer alteração com SESSION_ID do cookie


//-------------------------------------------------Investimentos-------------------------------------------------
router.post(RoutesEnum.investimento, InvestimentoController.createValidation, InvestimentoController.create);
router.get(RoutesEnum.investimento, InvestimentoController.getAllValidation, InvestimentoController.getAll);


//-------------------------------------------------Perguntas-------------------------------------------------
router.post(RoutesEnum.perguntas, PerguntasController.createValidation, PerguntasController.create);
router.get(RoutesEnum.perguntas,autenticateRoutes, PerguntasController.getAllValidation, PerguntasController.getAll);
// @ts-ignore
router.delete(RoutesEnum.perguntas+"/:id", PerguntasController.deleteByIdValidation, PerguntasController.deleteById); //todo ajustar pra fazer alteração com SESSION_ID do cookie


//-------------------------------------------------Alternativas-------------------------------------------------
router.post(RoutesEnum.alternativa, AlternativaController.createValidation, AlternativaController.create);


//-------------------------------------------------Comparativo-------------------------------------------------
// @ts-ignore
router.put(RoutesEnum.financeiro+"/:id", ComparativoController.updateByIdValidation, ComparativoController.updateByUserId); //todo ajustar pra fazer alteração com SESSION_ID do cookie
router.post(RoutesEnum.financeiro, ComparativoController.createValidation, ComparativoController.create);
// @ts-ignore
router.get(RoutesEnum.financeiro,autenticateRoutes, ComparativoController.getByUserIdValidation, ComparativoController.getByUserId); //todo ajustar pra fazer alteração com SESSION_ID do cookie

//-------------------------------------------------Respostas-------------------------------------------------
router.post(RoutesEnum.resposta,autenticateRoutes, RespostasController.createValidation, RespostasController.create);

export { router };
 