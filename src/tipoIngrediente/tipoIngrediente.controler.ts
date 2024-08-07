import { Request, Response, NextFunction } from 'express'
import { TipoIngredienteRepository } from './tipoIngrediente.repository.js'
import { TipoIngrediente } from './tipoIngrediente.entity.js'

const repository = new TipoIngredienteRepository

function sanitizeTipoIngrediente(req:Request, res:Response, next:NextFunction) {
  req.body.sanitizedTIngrediente = {
    codigo: req.body.codigo,
    descripcion: req.body.descripcion,
    medicionCantidad: req.body.medicionCantidad
  }
  Object.keys(req.body.sanitizedTIngrediente).forEach((keys) => {
    if(req.body.sanitizedTIngrediente[keys] === undefined) {
      delete req.body.sanitizedTIngrediente[keys]
    }
  })
  next()
}

function findAll(req:Request, res:Response) {
  res.json({data: repository.findAll()})
}

function findOne(req:Request, res:Response) {
  const codigo = req.params.cod
  const tIngrediente = repository.findOne({codigo})
  if (!tIngrediente) {
   return res.status(404).send({message: 'Este tipo de ingrediente no se ha encontrado'})
  }
  res.json({data: tIngrediente})
}

function add(req:Request, res:Response) {
  const input = req.body.sanitizedTIngrediente
  const tIngredienteInput = new TipoIngrediente(input.codigo, input.descripcion, input.medicionCantidad)
  const tIngrediente = repository.add(tIngredienteInput)
  return res.status(201).send({message: 'Nuevo tipo de ingrediente creado con éxito', data: tIngrediente})
}

function update(req:Request, res:Response) {
  req.body.sanitizedTIngrediente.codigo = req.params.cod
  const updatedTIngrediente = repository.update(req.body.sanitizedTIngrediente)
  if (!updatedTIngrediente) {
    return res.status(404).send({message: 'El tipo de ingrediente no ha sido encontrado'})
  }
  return res.status(200).send({message: 'Ingrediente modificado con éxito'})
}

function remove (req: Request, res: Response,) {
  const codigo = req.params.cod 
  const TIngrediente = repository.delete({codigo})

  if(!TIngrediente){
    res.status(404).send({ message: 'Tipo de ingrediente no encontrado' })
  }else{
  res.status(200).send({message:'Tipo de ingrediente eliminado correctamente'})
  }
}

export { sanitizeTipoIngrediente, findAll, findOne, add, update, remove }