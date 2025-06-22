import { Router } from "express";
import { getJoyas, inventarioFilter, pageInventario } from "../src/controller/joyasController.js";

const router = Router()

router.get('/joyas', getJoyas)
router.get('/joyas', pageInventario)
router.get('/joyas/filtros', inventarioFilter)

export default router