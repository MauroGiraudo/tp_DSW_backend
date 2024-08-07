import { Router } from "express";
import { sanitizeElaboracionPlato, findAll, findOne, add, update, remove } from "./elaboracionPlato.controller.js";

export const elaboracionPlatoRouter = Router()

elaboracionPlatoRouter.get('/', findAll)
elaboracionPlatoRouter.get('/:cod.:nro', findOne)
elaboracionPlatoRouter.post('/', sanitizeElaboracionPlato, add)
elaboracionPlatoRouter.put('/:cod.:nro', sanitizeElaboracionPlato, update)
elaboracionPlatoRouter.patch('/:cod.:nro', sanitizeElaboracionPlato, update)
elaboracionPlatoRouter.delete('/:cod.:nro', sanitizeElaboracionPlato, remove)