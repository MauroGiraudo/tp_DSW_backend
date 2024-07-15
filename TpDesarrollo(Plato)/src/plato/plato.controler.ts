import { Request, Response, NextFunction } from "express"
import { Plato } from "./plato.entity.js"
import { PlatoRepository } from "./plato.repository.js"

const repository = new PlatoRepository()

function sanitizePlatoInput(req: Request, res: Response, next:NextFunction){
  req.body.satinizedInput = {
    name: req.body.name,
    characterClass: req.body.platoClass,
    level: req.body.level,
    hp: req.body.hp,
    mana: req.body.mana,
    items: req.body.items,
  }

  Object.keys(req.body.sanitizedInput).forEach((key)=>{
    if (req.body.sanitizedInput[key]=== undefined){
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function findAll(req:Request,res:Response) {
  res.json({data: repository.findAll()})
}


function findOne(req:Request,res:Response) {
  const id= req.params.id
  const Plato = repository.findOne({id})
  if(!Plato){
    res.status(404).send({message:'Plato nor found'})
  }
  res.json({data: Plato})
}

function add(req:Request,res:Response) {
  const input = req.body.satinizedInput

  const platoInput = new Plato (
    input.name, 
    input.platoClass, 
    input.level, 
    input.hp, 
    input.mana, 
    input.items
  )

  const platos = repository.add(platoInput)
  return res.status(201).send({message: 'Plato created', data: platos})
}

function update(req:Request,res:Response) {
  req.body.sanitizedInput = req.params.id
  const plato = repository.update(req.body.sanitizedInput)
  if(!plato){
   return  res.status(404).send({message: 'Plato not found' })
  }
  return res.status(200).send({message: 'Plato update successfully', data: plato})
}

function remove(req:Request, res:Response) {
  const id= req.params.id
  const plato =  repository.delete({id})
  if(!plato){
    return res.status(404).send({message: 'Plato not found'})
  } else{
  res.status(200).send({message: 'Plato deleted successfully'})
  }
}



export{sanitizePlatoInput, findAll, findOne, add, update, remove}