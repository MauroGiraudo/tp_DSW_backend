import { orm } from "../shared/db/orm.js";
import { Ingrediente } from "./ingrediente.entity.js";
import { NextFunction, Request, Response } from "express";

const em = orm.em

function sanitizeIngrediente(req:Request, res:Response, next:NextFunction) {
  req.body.sanitizedIngrediente = {
    codigo: req.body.codigo,
    descIngre: req.body.descIngre,
    stockIngre: req.body.stockIngre,
    puntoDePedido: req.body.puntoDePedido,
    tipoIngrediente: req.body.tipoIngrediente
  }
  Object.keys(req.body.sanitizedIngrediente).forEach((keys) => {
    if(req.body.sanitizedIngrediente[keys] === undefined) {
      delete req.body.sanitizedIngrediente[keys]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const ingre = await em.find(Ingrediente, {}, {populate: ['tipoIngrediente']})
    res.status(200).json({message: 'Todos los ingredientes fueron encontrados con éxito', data: ingre})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const ingre = await em.findOneOrFail(Ingrediente, {codigo}, {populate: ['tipoIngrediente']})
    res.status(200).json({message: 'El ingrediente fue hallado con éxito', data: ingre})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function add(req: Request, res: Response) {
  try {
    const ingre = em.create(Ingrediente, req.body.sanitizedIngrediente)
    await em.flush()
    res.status(201).json({message: 'El ingrediente fue creado con éxito', data: ingre})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function update(req: Request, res: Response) {
    try {
    const codigo = Number.parseInt(req.params.cod)
    const ingre = await em.findOneOrFail(Ingrediente, {codigo})
    em.assign(ingre, req.body.sanitizedIngrediente)
    em.flush()
    res.status(200).json({message: 'El ingrediente ha sido actualizado con éxito', data: req.body.sanitizedIngrediente})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function remove(req: Request, res: Response) {
    try {
    const codigo = Number.parseInt(req.params.cod)
    const ingre = await em.findOneOrFail(Ingrediente, {codigo})
    em.removeAndFlush(ingre)
    res.status(200).json({message: 'El ingrediente ha sido eliminado con éxito', data: ingre})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

export { sanitizeIngrediente, findAll, findOne, add, update, remove }