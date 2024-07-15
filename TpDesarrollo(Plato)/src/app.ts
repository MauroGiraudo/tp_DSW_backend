import express from 'express'
import { platoRouter } from './plato/plato.routes.js'

const app = express()
app.use(express.json())

app.use('/api/platos', platoRouter)

app.use((_,res)=>{
  return res.status(404).send({message:'Resourse not found'})
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/")
})