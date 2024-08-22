import { Router} from "express";
import { sanitizePlatoInput, findAll, findOne, add, update, remove } from "./plato.controller.js";

export const platoRouter = Router()


platoRouter.get('/', findAll)
platoRouter.get('/:numPlato', findOne)
platoRouter.post('/', sanitizePlatoInput, add)
platoRouter.put('/:numPlato', sanitizePlatoInput, update)
platoRouter.patch('/:numPlato', sanitizePlatoInput, update)
platoRouter.delete('/:numPlato', sanitizePlatoInput, remove)



