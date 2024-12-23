import { NextFunction, Request, Response } from "express"
import { orm } from "../../shared/db/orm.js"
import { ElaboracionPlato } from "./elaboracionPlato.entity.js"
import { Plato } from "../plato.entity.js"
import { Ingrediente } from "../../ingrediente/ingrediente.entity.js"
import { validarElaboracionPlato, validarElaboracionPlatoPatch } from "./elaboracionPlato.schema.js"
import { handleErrors } from "../../shared/errors/errorHandler.js"
import { PlatoNotFoundError } from "../../shared/errors/entityErrors/plato.errors.js"
import { ElaboracionPlatoNotFoundError } from "../../shared/errors/entityErrors/elaboracionPlato.errors.js"
import { IngredienteNotFoundError } from "../../shared/errors/entityErrors/ingrediente.errors.js"


const em = orm.em

//DEJAR POR AHORA, PUEDE LLEGAR A SER ÚTIL
async function findOne(req: Request, res: Response) {
  try{
    const numPlato = Number.parseInt(req.params.nro)
    const codigo = Number.parseInt(req.params.cod)
    const plato = await em.findOneOrFail(Plato, {numPlato}, {populate: ['tipoPlato'], failHandler: () => {throw new PlatoNotFoundError}})
    const ingrediente = await em.findOneOrFail(Ingrediente, {codigo}, {failHandler: () => {throw new IngredienteNotFoundError}})
    const elabPlato = await em.findOneOrFail(ElaboracionPlato, {plato, ingrediente}, {populate: ['plato', 'ingrediente'], failHandler: () => {throw new ElaboracionPlatoNotFoundError}})
    res.status(200).json({
      message: `La cantidad del ingrediente ${ingrediente.descIngre} para el plato ${plato.descripcion} ha sido encontrada con éxito`, 
      data: elabPlato
    })
  } catch(error:any){
    handleErrors(error, res)
  }
}

async function update(req: Request, res: Response) {
  try{
    const numPlato = Number.parseInt(req.params.nro)
    const codigo = Number.parseInt(req.params.cod)
    const plato = await em.findOneOrFail(Plato, {numPlato}, {failHandler: () => {throw new PlatoNotFoundError}})
    const ingrediente = await em.findOneOrFail(Ingrediente, {codigo}, {failHandler: () => {throw new IngredienteNotFoundError}})
    const elabPlato = await em.findOneOrFail(ElaboracionPlato, {plato, ingrediente}, 
      {failHandler: () => {throw new ElaboracionPlatoNotFoundError}})
    let elabPlatoValido
    if(req.method === 'PATCH') {
      elabPlatoValido = validarElaboracionPlatoPatch(req.body)
    } else {
      elabPlatoValido = validarElaboracionPlato(req.body)
    }
    em.assign(elabPlato, elabPlatoValido)
    await em.flush()
    res.status(200).json({
      message: `La cantidad del ingrediente ${ingrediente.descIngre} para el plato ${plato.descripcion} ha sido actualizada exitosamente`, 
      data: elabPlato
    })
  } catch(error:any){
    handleErrors(error, res)
  }
}

async function remove(req: Request, res: Response) {
  try{
    const numPlato = Number.parseInt(req.params.nro)
    const codigo = Number.parseInt(req.params.cod)
    const plato = await em.findOneOrFail(Plato, {numPlato}, {failHandler: () => {throw new PlatoNotFoundError}})
    const ingrediente = await em.findOneOrFail(Ingrediente, {codigo}, {failHandler: () => {throw new IngredienteNotFoundError}})
    const elabPlato = await em.findOneOrFail(ElaboracionPlato, {plato, ingrediente}, {failHandler: () => {throw new ElaboracionPlatoNotFoundError}})
    await em.removeAndFlush(elabPlato)
    res.status(200).json({
      message: `La cantidad del ingrediente ${ingrediente.descIngre} para el plato ${plato.descripcion} ha sido eliminada con éxito`, 
      data: elabPlato
    })
  } catch(error:any){
    handleErrors(error, res)
  }
}

export { findOne, update, remove}