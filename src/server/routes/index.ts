import { Router } from "express";
import { UsuariosController } from "../controllers";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Ola, Dev");
});

router.get("/usuario",UsuariosController.getAllValidation,UsuariosController.getAll);
// @ts-ignore
router.get("/usuario/:id",UsuariosController.getByIdValidation,UsuariosController.getById);
// @ts-ignore
router.put("/usuario/:id",UsuariosController.updateByIdValidation,UsuariosController.updateById);
// @ts-ignore
router.delete("/usuario/:id",UsuariosController.deleteByIdValidation,UsuariosController.deleteById);
router.post("/usuario",UsuariosController.createValidation,UsuariosController.create);

export { router };
 