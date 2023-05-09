import { Router } from "express";
import {
  InvestimentoController,
  UsuariosController,
  PerguntasController,
  AlternativaController,
  FinanceiroController,
  TransacaoController,
  TotalizadorController,
  RespostasController
} from "../controllers";
import { autenticateRoutes } from "../shared/middleware";
import {RoutesEnum} from "./routes.enum";
import {ProcessarInvestimentosController} from "../controllers/processar_investimentos";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Bem vindo, você acessou a API REST do projeto de TCC PrimoPlata!");
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
router.delete(RoutesEnum.usuario,autenticateRoutes,UsuariosController.deleteByIdValidation,UsuariosController.deleteById);


//-------------------------------------------------Investimentos-------------------------------------------------
router.post(RoutesEnum.investimento, InvestimentoController.createValidation, InvestimentoController.create);
router.get(RoutesEnum.investimento, InvestimentoController.getAllValidation, InvestimentoController.getAll);


//-------------------------------------------------Perguntas-------------------------------------------------
router.post(RoutesEnum.perguntas, PerguntasController.createValidation, PerguntasController.create);
router.get(RoutesEnum.perguntas,autenticateRoutes, PerguntasController.getAllValidation, PerguntasController.getAll);
// NÃO SERÁ PERMITIDO DELETAR PERGUNTAS DE MOMENTO
//router.delete(RoutesEnum.perguntas+"/:id", PerguntasController.deleteByIdValidation, PerguntasController.deleteById);


//-------------------------------------------------Alternativas-------------------------------------------------
router.post(RoutesEnum.alternativa, AlternativaController.createValidation, AlternativaController.create);


//-------------------------------------------------Financeiro-------------------------------------------------
// @ts-ignore
router.put(RoutesEnum.financeiro,autenticateRoutes, FinanceiroController.updateByIdValidation, FinanceiroController.updateByUserId);

//CRIADO QUANDO USUÁRIO CRIA O CADASTRO, NÃO SERÁ NECESSÁRIO DE MOMENTO
//router.post(RoutesEnum.financeiro, FinanceiroController.createValidation, FinanceiroController.create);
// @ts-ignore
router.get(RoutesEnum.financeiro,autenticateRoutes, FinanceiroController.getByUserIdValidation, FinanceiroController.getByUserId);

//-------------------------------------------------Respostas-------------------------------------------------
router.post(RoutesEnum.resposta,autenticateRoutes, RespostasController.createValidation, RespostasController.create);

//-------------------------------------------------Totalizador-------------------------------------------------
// @ts-ignore
router.get(RoutesEnum.totalizador, autenticateRoutes, TotalizadorController.getByIdValidation, TotalizadorController.getByUserId)

//-------------------------------------------------Transacoes-------------------------------------------------
router.post(RoutesEnum.transacao,autenticateRoutes, TransacaoController.transacaoValidation, TransacaoController.transacao)

//-------------------------------------------------Processar Transações-------------------------------------------------
router.post(RoutesEnum.processar, ProcessarInvestimentosController.processAll)

export { router };
 