import { TipoIngrediente } from './tipoIngrediente.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
em.getRepository(TipoIngrediente);
/*
function sanitizeTipoIngrediente(req:Request, res:Response, next:NextFunction) {
  req.body.sanitizedTIngrediente = {
    codigo: req.body.codigo,
    descTIngre: req.body.descTIngre,
    unidadMedida: req.body.unidadMedida
  }
  Object.keys(req.body.sanitizedTIngrediente).forEach((keys) => {
    if(req.body.sanitizedTIngrediente[keys] === undefined) {
      delete req.body.sanitizedTIngrediente[keys]
    }
  })
  next()
}
*/
async function findAll(req, res) {
    try {
        const tiposIngre = await em.find(TipoIngrediente, {});
        res.status(200).json({ message: 'Todos los tipos de ingrediente fueron encontrados', data: tiposIngre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const codTipoIngre = Number.parseInt(req.params.cod);
        const tipoIngre = await em.findOneOrFail(TipoIngrediente, { codigo: codTipoIngre });
        res.status(200).json({ message: 'El tipo de ingrediente fue encontrado con éxito', data: tipoIngre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const tipoIngre = em.create(TipoIngrediente, req.body);
        await em.flush(),
            res.status(201).json({ message: 'El tipo de ingrediente fue creado con éxito', data: tipoIngre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const codigo = Number.parseInt(req.params.cod);
        const tipoIngre = await em.findOneOrFail(TipoIngrediente, { codigo });
        em.assign(tipoIngre, req.body);
        em.flush();
        res.status(200).json({ message: 'El tipo de ingrediente fue actualizado con éxito', data: tipoIngre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const codigo = Number.parseInt(req.params.cod);
        const deletedTipoIngre = await em.findOneOrFail(TipoIngrediente, { codigo });
        await em.removeAndFlush(deletedTipoIngre);
        res.status(200).json({ message: 'El tipo de ingrediente ha sido eliminado con éxito', data: deletedTipoIngre });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { /*sanitizeTipoIngrediente,*/ findAll, findOne, add, update, remove };
//# sourceMappingURL=tipoIngrediente.controller.js.map