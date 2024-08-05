import { Router } from 'express'
import { /*sanitizeTipoIngrediente,*/ findAll, findOne, add, update, remove } from './tipoIngrediente.controler.js'

export const tipoIngredienteRouter = Router()

tipoIngredienteRouter.get('/', findAll)
tipoIngredienteRouter.get('/:cod', findOne)
tipoIngredienteRouter.post('/', add)
tipoIngredienteRouter.put('/:cod', update)
tipoIngredienteRouter.patch('/:cod', update)
tipoIngredienteRouter.delete('/:cod', remove)