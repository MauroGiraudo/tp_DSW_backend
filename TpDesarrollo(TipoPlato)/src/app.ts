import express from 'express'
import { tipoPlatoRouter } from './tipoPlato/tipoPlato.routes.js'

const app = express()
app.use(express.json())

app.use('/api/tipoPlato', tipoPlatoRouter)

app.use((_,res)=>{
  return res.status(404).send({message:'Resourse not found'})
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/")
})