import { Router } from 'express';
import { sanitizeElaboracionPlato, findAll, findOne, add, update, remove } from './elaboracionPlato.controller.js';
export const elabPlatoRouter = Router();
export const elabIngreRouter = Router();
//Trabajo asumiendo que puedo utilizar el mismo router en app.ts con 2 URLs distintnas
elabPlatoRouter.get('/:nro/ingredientes', findAll);
elabPlatoRouter.get('/:nro/ingredientes/:cod', findOne);
elabPlatoRouter.post('/:nro/ingredientes', /*(req, res)=> {console.log(JSON.stringify(req))},*/ sanitizeElaboracionPlato, add);
elabPlatoRouter.patch('/:nro/ingredientes/:cod', sanitizeElaboracionPlato, update);
elabPlatoRouter.delete('/:nro/ingredientes/:cod', remove);
//# sourceMappingURL=elaboracionPlato.routes.js.map