import { findAll, findOne, add, sanitizeIngrediente, update, remove } from './ingrediente.controller.js'
import { Router } from 'express'

export const ingredienteRouter = Router()

ingredienteRouter.get('/', findAll)
ingredienteRouter.get('/:cod', findOne)
ingredienteRouter.post('/', sanitizeIngrediente, add)
ingredienteRouter.put('/:cod', sanitizeIngrediente, update)
ingredienteRouter.patch('/:cod', sanitizeIngrediente, update)
ingredienteRouter.delete('/:cod', remove)