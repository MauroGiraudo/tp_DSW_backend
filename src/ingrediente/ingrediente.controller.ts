import { Proveedor } from "../proveedor/proveedor.entity.js";
import { orm } from "../shared/db/orm.js";
import { Ingrediente } from "./ingrediente.entity.js";
import { NextFunction, Request, Response } from "express";
import { validarIngrediente, validarIngredientePatch } from "./ingrediente.schema.js";
import { IngredienteBadRequest, IngredienteNotFoundError, IngredientePreconditionFailed } from "../shared/errors/entityErrors/ingrediente.errors.js";
import { handleErrors } from "../shared/errors/errorHandler.js";
import { ProveedorNotFoundError } from "../shared/errors/entityErrors/proveedor.errors.js";
import { IngredienteDeProveedor } from "./ingredienteDeProveedor/ingredienteDeProveedor.entity.js";
import { validarFindAll } from "../shared/validarFindAll.js";

const em = orm.em

function sanitizeIngrediente(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    codigo: req.body.codigo,
    descIngre: req.body.descIngre,
    puntoDePedido: req.body.puntoDePedido,
    stock: req.body.stock,
    unidadMedida: req.body.unidadMedida,
    aptoCeliacos: req.body.aptoCeliacos,
    aptoVegetarianos: req.body.aptoVegetarianos,
    aptoVeganos: req.body.aptoVeganos,
  }
  next()
}


function sanitizeQuery(req: Request){
  const queryResult: any = {
    descIngre: req.query.descripcionParcial,
    aptoCeliacos: req.query.aptoCeliacos,
    aptoVegetarianos: req.query.aptoVegetarianos,
    aptoVeganos: req.query.aptoVeganos
  }
// El operador "!!" me permite convertir la cadena proveniente del queryString en el booleano "true"
// "!!!" convierte la cadena en "false"
// Esto también puede realizarse con el método "Boolean(cadena)", siendo este resultado = true y !Boolean(cadena) = false
  Object.keys(queryResult).forEach((keys) => {
    if(queryResult[keys] === undefined) {
      delete queryResult[keys]
    } else if(keys !== 'descIngre' && queryResult[keys] === 'true') {
      queryResult[keys] = !!queryResult[keys]
    } else if(keys !== 'descIngre' && queryResult[keys] === 'false') {
      queryResult[keys] = !!!(queryResult[keys])
    } else if(keys === 'descIngre') {
      queryResult[keys] = {$like: `%${req.query.descripcionParcial}%`}
    }
  })
  return queryResult
}

// Validar recepción de queryString como la entidad "Bebida" (Ingrediente será más compleja)
async function findAll(req: Request, res: Response) {
  try {
    req.query.sanitizedQuery = sanitizeQuery(req)
    const ingre = validarFindAll(await em.find(Ingrediente, req.query.sanitizedQuery as object), IngredienteNotFoundError)
    res.status(200).json({message: 'Todos los ingredientes fueron encontrados con éxito', data: ingre})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const ingre = await em.findOneOrFail(Ingrediente, {codigo}, {populate: ['ingredienteDeProveedor'], failHandler: () => {throw new IngredienteNotFoundError}})
    res.status(200).json({message: `El ingrediente ${ingre.descIngre} fue hallado con éxito`, data: ingre})
  } catch(error: any) {
    handleErrors(error, res)
  }
}


// Validamos que, si no hay proveedores registrados, no se puedan agregar ingredientes
// Sincronizamos la creación de ingredientes con la creación de "IngredienteDeProveedor".
async function add(req: Request, res: Response) {
  try {
    if ((await em.find(Proveedor, {})).length === 0) {
      throw new IngredientePreconditionFailed
    } else if (req.body.proveedor === undefined){
      throw new IngredienteBadRequest
    }
    else {
      const ingredienteValido = validarIngrediente(req.body.sanitizedInput)
      const ingre = em.create(Ingrediente, ingredienteValido)
      // creación de la relación entre ingrediente y proveedor
      const id = Number.parseInt(req.body.proveedor)
      const proveedor = await em.findOneOrFail(Proveedor, {id}, {failHandler: () => {throw new ProveedorNotFoundError}})
      const ingredienteDeProveedor = await em.create(IngredienteDeProveedor, {ingrediente: ingre, proveedor})
      // creación de la relación entre ingrediente y proveedor 
      await em.flush()
      res.status(201).json({message: `El ingrediente ${ingre.descIngre} fue creado con éxito`, data: ingre})
    }
    } catch(error: any) {
    handleErrors(error, res)
  }
}

async function update(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const ingre = await em.findOneOrFail(Ingrediente, {codigo}, {failHandler: () => {throw new IngredienteNotFoundError}})
    let ingreUpdated
    if(req.method === 'PATCH') {
      ingreUpdated = validarIngredientePatch(req.body)
    } else {
      ingreUpdated = validarIngrediente(req.body)
    }
    em.assign(ingre, ingreUpdated)
    await em.flush()
    res.status(200).json({message: `El ingrediente ${ingre.descIngre} ha sido actualizado con éxito`, data: ingre})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

async function remove(req: Request, res: Response) {
    try {
    const codigo = Number.parseInt(req.params.cod)
    const ingre = await em.findOneOrFail(Ingrediente, {codigo}, {failHandler: () => {throw new IngredienteNotFoundError}})
    await em.removeAndFlush(ingre)
    res.status(200).json({message: `El ingrediente ${ingre.descIngre} ha sido eliminado con éxito`, data: ingre})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

export { findAll, findOne, add, sanitizeIngrediente, update, remove }