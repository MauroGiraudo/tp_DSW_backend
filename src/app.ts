import 'reflect-metadata'
import { RequestContext } from '@mikro-orm/core'
import { orm, syncSchema } from './shared/db/orm.js'
import express from 'express'
import { tipoIngredienteRouter } from './ingrediente/tipoIngrediente.routes.js'
import { ingredienteRouter } from './ingrediente/ingrediente.routes.js'
import { tipoPlatoRouter } from './plato/tipoPlato.routes.js'
import { platoRouter } from './plato/plato.routes.js'
import { clienteRouter } from './cliente/cliente.routes.js'
import { elabPlatoRouter } from './elaboracionPlato/elaboracionPlato.routes.js'
import { elabIngreRouter } from './elaboracionPlato/elaboracionIngrediente.routes.js'
/*import { pedidoRouter } from './pedido/pedido.routes.js'*/


const port = 3000
const app = express()
app.use(express.json())

//

app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

//
app.use('/api/platos', elabPlatoRouter)

// CREAR UN NUEVO CONTROLLER CON UN SANITIZED DISTINTO (POR LO TANTO, OPERACIONES CRUD LIGERAMENTE DISTINTAS)
//INCORPORARLOS AL ROUTES Y PROBAR SI FUNCIONA.

app.use('/api/ingredientes', elabIngreRouter)

app.use('/api/ingredientes/tipos', tipoIngredienteRouter)

app.use('/api/ingredientes', ingredienteRouter)

app.use('/api/platos/tipos', tipoPlatoRouter)

app.use('/api/platos', platoRouter)

app.use('/api/clientes', clienteRouter)

/*
¿Puedo utilizar dos veces "elabPlatoRouter" con dos rutas distintas? Esto daría la posibilidad de, o acceder a todos los 
ingredientes de un plato junto con sus cantidades, o ver todos los platos en los que se utiliza un ingrediente junto con la cantidad
correspondiente. Si bien la funcionalidad más útil va a ser la primera, la segunda puede llegar a ser interesante para la 
elaboración de informes a futuro (por ejemplo, ver el ingrediente más utilizado para darle prioridad a la hora de reponer stock o 
incrementar su punto de pedido) 

Si no es posible, ¿Tendría que crear dos Router distintos? ¿Cada Router debería tener un controlador diferente asociado?
*/

//EL PROFE RECOMIENDA TENER UN ÚNICO ROUTER CON LOS CONTROLLER NECESARIOS.
//--------------------------------------------------------------------------

app.use((req, res) => {
  return res.status(404).send({message: 'Recurso no encontrado'})
})

await syncSchema()

app.listen(port, () => {
  console.log(`Server running in: http://localhost:${port}/`)
})

