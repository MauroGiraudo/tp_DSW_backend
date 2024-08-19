import { Request, Response, NextFunction } from "express"
import { Plato } from "./plato.entity.js"
import { orm } from "../shared/db/orm.js"

const em = orm.em

function sanitizePlatoInput(req: Request, res: Response, next:NextFunction){
  req.body.sanitizedInput = {
    numPlato: req.body.numPlato,
    tipoPlato: req.body.tipoPlato,
    descripcion: req.body.descripcion,
    tiempo: req.body.tiempo,
  }

  Object.keys(req.body.sanitizedInput).forEach((key)=>{
    if (req.body.sanitizedInput[key]=== undefined){
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req:Request,res:Response) {
  try{
    const platos = await em.find(Plato, {}, {populate:['tipoPlato']})
    res.status (200).json({message: 'Todos los platos encontrados', data: platos})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}


async function findOne(req:Request,res:Response) {
  try{
    const numPlato = Number.parseInt(req.params.numPlato)
    const plato = await em.findOneOrFail(Plato, {numPlato}, {populate: ['tipoPlato']})
    res.status(200).json({message: 'Plato encontrado', data: plato})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req:Request,res:Response) {
  try{
    const plato = em.create(Plato, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({message: 'Plato creado', data:plato})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function update(req:Request,res:Response) {
  try{
    const numPlato = Number.parseInt(req.params.numPlato)
    const platoToUpdate = await em.findOneOrFail(Plato, {numPlato})
    em.assign(platoToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: 'El plato ha sido actualizado exitosamente', data: platoToUpdate})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function remove(req:Request, res:Response) {
    try {
    const numPlato = Number.parseInt(req.params.numPlato)
    const plato = await em.findOneOrFail(Plato, {numPlato})
    em.removeAndFlush(plato)
    res.status(200).json({message: 'El plato ha sido eliminado con éxito', data: plato})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}



export{sanitizePlatoInput, findAll, findOne, add, update, remove}