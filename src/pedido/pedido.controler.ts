import { Request,Response,NextFunction } from "express"
import { PedidoRepository } from "./pedido.repository.js"
import { Pedido } from "./pedido.entity.js"

const repository = new PedidoRepository

function sanitizePedidoInput(req:Request, res:Response, next:NextFunction){
  req.body.sanitizedInput = {
      estado: req.body.estado,
      fecha: req.body.fecha,
      hora: req.body.hora,
      nroMesa: req.body.nroMesa,
      cliente: req.body.cliente,
  };

  Object.keys(req.body.sanitizedInput).forEach(key => {
    if(req.body.sanitizedInput [key] === undefined){
      delete req.body.sanitizedInput [key]
    }
  })
  next()
}

function findAll(req:Request,res:Response) {
  res.json({ data: repository.findAll()})
}

function findOne(req:Request,res:Response) {
  const nroPed = req.params.nroPed
  const pedido = repository.findOne({nroPed}) 
  if (!pedido) {
    return res.status(404).send({ message: 'Pedido no encontrado' })
  }
  res.json({ data: pedido }) 
}

function add(req:Request,res:Response) {
  const input = req.body.sanitizedInput

  const pedidoInput = new Pedido (
    input.estado,
    input.fecha,
    input.hora,
    input.nroMesa,
    input.cliente,
  )

  const pedido = repository.add(pedidoInput)
  return res.status(201).send({message: 'Pedido creado', data: pedido})
}

function update (req:Request,res:Response){
  req.body.sanitizedInput.nroPed = req.params.nroPed
  const pedido = repository.update(req.body.sanitizedInput) 

  if(!pedido){
    return res.status(404).send({message: 'Pedido no encontrado'})
  }

  return res.status(200).send ({message: 'Pedido actualizado', data: pedido})
}

function remove (req:Request,res:Response) {
  const nroPed = req.params.nroPed
  const pedido = repository.delete ({nroPed})

  if (!pedido){
    res.status(404).send ({message: 'Pedido no encontrado'})
  }else{
    res.status(200).send({message:'El pedido fue borrado con exito'})
  }
}

export {sanitizePedidoInput,findAll,findOne,add,update,remove}