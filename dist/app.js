import express from 'express';
import { tipoIngredienteRouter } from './tipo-ingrediente/tipo-ingrediente.routes.js';
import { ingredienteRouter } from './ingrediente/ingrediente.routes.js';
import { clienteRouter } from './cliente/cliente.routes.js';
const port = 3000;
const app = express();
app.use(express.json());
app.use('/api/tiposIngrediente', tipoIngredienteRouter);
app.use('/api/ingredientes', ingredienteRouter);
app.use('/api/cliente', clienteRouter);
/*
//getAll => muestra todos los tipos de ingredientes registrados
app.get('/api/tiposIngrediente', (req, res) => {
  res.json({data: repository.findAll()})
})

//getOne => muestra un único tipo de ingrediente
app.get('/api/tiposIngrediente/:cod', (req, res) => {
  const codigo = req.params.cod
  const tIngrediente = repository.findOne({codigo})
  if (!tIngrediente) {
   return res.status(404).send({message: 'Este tipo de ingrediente no se ha encontrado'})
  }
  res.json({data: tIngrediente})
})

//Post => El usuario ingresa un nuevo tipo de ingrediente
app.post('/api/tiposIngrediente', sanitizeTipoIngrediente, (req, res) => {
  const input = req.body.sanitizedTIngrediente
  const tIngredienteInput = new TipoIngrediente(input.codigo, input.descripcion)
  const tIngrediente = repository.add(tIngredienteInput)
  return res.status(201).send({message: 'Nuevo tipo de ingrediente creado con éxito', data: tIngrediente})
})

app.put('/api/tiposIngrediente/:cod', sanitizeTipoIngrediente, (req, res) => {
  req.body.sanitizedTIngrediente.codigo = req.params.cod
  const updatedTIngrediente = repository.update(req.body.sanitizedTIngrediente)
  if (!updatedTIngrediente) {
    return res.status(404).send({message: 'El tipo de ingrediente no ha sido encontrado'})
  }
  return res.status(200).send({message: 'Ingrediente modificado con éxito'})

})
*/
app.use((req, res) => {
    return res.status(404).send({ message: 'Recurso no encontrado' });
});
app.listen(port, () => {
    console.log(`Server running in: http://localhost:${port}/`);
});
//# sourceMappingURL=app.js.map