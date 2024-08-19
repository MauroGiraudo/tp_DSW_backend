import { Router } from "express";
import { findAll, sanitizeElaboracionIngrediente, add, remove, update } from "./elaboracionIngrediente.controller.js";
import { findOne } from './elaboracionPlato.controller.js';
export const elabIngreRouter = Router();
elabIngreRouter.get('/:cod/platos', findAll);
elabIngreRouter.get('/:cod/platos/:nro', findOne);
elabIngreRouter.post('/:cod/platos', sanitizeElaboracionIngrediente, add);
elabIngreRouter.patch('/:cod/platos/:nro', sanitizeElaboracionIngrediente, update);
elabIngreRouter.delete('/:cod/platos/:nro', remove);
//# sourceMappingURL=elaboracionIngrediente.routes.js.map