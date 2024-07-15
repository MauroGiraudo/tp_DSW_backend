import { Router} from "express";
import { sanitizePlatoInput, findAll, findOne, add, update, remove } from "./plato.controler.js";

export const platoRouter = Router()

platoRouter.get('/', findAll)
platoRouter.get('/:id', findOne)
platoRouter.post('/', sanitizePlatoInput, add)
platoRouter.put('/:id', sanitizePlatoInput, update)
platoRouter.patch('/:id', sanitizePlatoInput, update)
platoRouter.delete('/:id', sanitizePlatoInput, remove)



