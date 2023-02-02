import { Router } from "express";
import { UsuariosController } from "../controllers";
import { StatusCodes } from "http-status-codes";
import { autenticateRoutes } from "../shared/middleware";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Ola, Dev");
});

router.get("/usuario",autenticateRoutes,UsuariosController.getAllValidation,UsuariosController.getAll);
// @ts-ignore
router.get("/usuario/:id",autenticateRoutes,UsuariosController.getByIdValidation,UsuariosController.getById);
// @ts-ignore
router.put("/usuario/:id",autenticateRoutes,UsuariosController.updateByIdValidation,UsuariosController.updateById);
// @ts-ignore
router.delete("/usuario/:id",autenticateRoutes,UsuariosController.deleteByIdValidation,UsuariosController.deleteById);

router.post("/cadastrar",UsuariosController.createValidation,UsuariosController.create);

router.post("/entrar", UsuariosController.loginValidation,UsuariosController.login);

export { router };
 