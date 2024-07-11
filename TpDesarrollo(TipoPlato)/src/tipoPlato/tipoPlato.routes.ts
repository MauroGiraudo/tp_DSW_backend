import { Router} from "express";
import { sanitizedTipoPlatoInput, findAll, findOne, add, update, remove } from "./tipoPlato.controler.js";

export const tipoPlatoRouter = Router()

tipoPlatoRouter.get('/', findAll)
tipoPlatoRouter.get('/:id', findOne)
tipoPlatoRouter.post('/', sanitizedTipoPlatoInput, add)
tipoPlatoRouter.put('/:id', sanitizedTipoPlatoInput, update)
tipoPlatoRouter.patch('/:id', sanitizedTipoPlatoInput, update)
tipoPlatoRouter.delete('/:id', sanitizedTipoPlatoInput, remove)



